import { useState, useCallback } from 'react'
import type { GuestCounts, ShoppingItem, Category } from '../types'

function makeItem(
  id: string,
  category: Category,
  nameKey: string,
  qty: number,
  unitKey: string
): ShoppingItem {
  const roundedQty = Math.round(qty * 10) / 10
  return {
    id,
    category,
    nameKey,
    calculatedQty: roundedQty,
    currentQty: roundedQty,
    unitKey,
    purchased: false,
  }
}

export function calculateItems(guests: GuestCounts): ShoppingItem[] {
  const { adults, kids, vegetarians, vegans, allergyGuests } = guests
  const allergyCount = allergyGuests.length
  const total = adults + kids

  if (total + allergyCount === 0) return []

  // Split vegetarians/vegans/allergy guests proportionally between adults and kids
  const adultRatio = total > 0 ? adults / total : 0.5

  const vegAdults = Math.round(vegetarians * adultRatio)
  const vegKids = vegetarians - vegAdults
  const veganAdults = Math.round(vegans * adultRatio)
  const veganKids = vegans - veganAdults
  const allergyAdults = Math.round(allergyCount * adultRatio)
  const allergyKids = allergyCount - allergyAdults

  // Meat-eating guests
  const meatAdults = Math.max(0, adults - vegAdults - veganAdults - allergyAdults)
  const meatKids = Math.max(0, kids - vegKids - veganKids - allergyKids)

  // Non-allergy guests for sides calculation
  const sidesAdults = Math.max(0, adults - allergyAdults)
  const sidesKids = Math.max(0, kids - allergyKids)

  // Vegetarian/vegan bonus guests for sides
  const vegBonus = vegetarians + vegans

  // Total for drinks and equipment (includes allergy guests)
  const grandTotal = total + allergyCount

  const items: ShoppingItem[] = []

  // ── MEAT ──────────────────────────────────────────────────────────────────
  const chickenQty = meatAdults * 3 + meatKids * 2
  if (chickenQty > 0) items.push(makeItem('chicken', 'meat', 'chicken', chickenQty, 'unitPieces'))

  const steakQty = meatAdults * 300 + meatKids * 150
  if (steakQty > 0) items.push(makeItem('steak', 'meat', 'steak', steakQty, 'unitGrams'))

  // ── SIDES ─────────────────────────────────────────────────────────────────
  const saladQty = sidesAdults * 150 + sidesKids * 80 + vegBonus * 50
  if (saladQty > 0) items.push(makeItem('salads', 'sides', 'salads', saladQty, 'unitGrams'))

  const hummusQty = sidesAdults * 100 + sidesKids * 60 + vegBonus * 50
  if (hummusQty > 0) items.push(makeItem('hummus', 'sides', 'hummus', hummusQty, 'unitGrams'))

  const pitaQty = sidesAdults * 3 + sidesKids * 2 + vegBonus * 1
  if (pitaQty > 0) items.push(makeItem('pitas', 'sides', 'pitas', pitaQty, 'unitPieces'))

  // ── VEGGIE / VEGAN ALTERNATIVES ──────────────────────────────────────────
  // Halloumi — not for vegans
  const halloumiQty = vegAdults * 150 + vegKids * 100
  if (halloumiQty > 0)
    items.push(makeItem('halloumi', 'veggie', 'halloumi', halloumiQty, 'unitGrams'))

  // Veggie skewers — vegetarians + vegans
  const skewersQty = (vegAdults + veganAdults) * 2 + (vegKids + veganKids) * 1
  if (skewersQty > 0)
    items.push(makeItem('skewers', 'veggie', 'veggieSkewers', skewersQty, 'unitPieces'))

  // Tofu — vegans only
  const tofuQty = veganAdults * 150 + veganKids * 100
  if (tofuQty > 0) items.push(makeItem('tofu', 'veggie', 'tofu', tofuQty, 'unitGrams'))

  // Corn — vegetarians + vegans
  const cornQty = Math.ceil(
    (vegAdults + veganAdults) * 1 + (vegKids + veganKids) * 0.5
  )
  if (cornQty > 0) items.push(makeItem('corn', 'veggie', 'corn', cornQty, 'unitPieces'))

  // ── DRINKS (all guests) ───────────────────────────────────────────────────
  items.push(makeItem('water', 'drinks', 'water', grandTotal * 0.5, 'unitLiters'))
  items.push(
    makeItem(
      'softDrinks',
      'drinks',
      'softDrinks',
      Math.round(grandTotal * 0.33 * 10) / 10,
      'unitLiters'
    )
  )
  if (adults + allergyAdults > 0)
    items.push(makeItem('beer', 'drinks', 'beer', adults + allergyAdults, 'unitBottles'))

  // ── EQUIPMENT (all guests) ────────────────────────────────────────────────
  const charcoalQty = Math.max(2, Math.ceil(grandTotal / 5))
  items.push(makeItem('charcoal', 'equipment', 'charcoal', charcoalQty, 'unitKg'))

  const lighterQty = Math.max(1, Math.ceil(grandTotal / 20))
  items.push(makeItem('lighterFluid', 'equipment', 'lighterFluid', lighterQty, 'unitBottles'))

  items.push(makeItem('plates', 'equipment', 'plates', grandTotal * 3, 'unitPieces'))
  items.push(makeItem('cutlery', 'equipment', 'cutlery', grandTotal * 2, 'unitSets'))
  items.push(makeItem('napkins', 'equipment', 'napkins', grandTotal * 10, 'unitPieces'))

  return items
}

export function useCalculator() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [hasCalculated, setHasCalculated] = useState(false)

  const calculate = useCallback((guests: GuestCounts) => {
    const newItems = calculateItems(guests)
    setItems(newItems)
    setHasCalculated(true)
  }, [])

  const updateItemQty = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, currentQty: Math.max(0, Math.round((item.currentQty + delta) * 10) / 10) }
          : item
      )
    )
  }, [])

  const resetItemQty = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, currentQty: item.calculatedQty } : item
      )
    )
  }, [])

  const togglePurchased = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    )
  }, [])

  const loadItems = useCallback((newItems: ShoppingItem[]) => {
    setItems(newItems)
    setHasCalculated(true)
  }, [])

  const resetAll = useCallback(() => {
    setItems([])
    setHasCalculated(false)
  }, [])

  return {
    items,
    hasCalculated,
    calculate,
    updateItemQty,
    resetItemQty,
    togglePurchased,
    loadItems,
    resetAll,
  }
}
