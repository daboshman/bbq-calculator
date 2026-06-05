export interface AllergyGuest {
  id: string
  note: string
}

export interface MeatPortions {
  chickenPerAdult: number
  chickenPerKid: number
  steakPerAdult: number
  steakPerKid: number
  hamburgersPerAdult: number
  hamburgersPerKid: number
  sausagesPerAdult: number
  sausagesPerKid: number
}

export const defaultMeatPortions: MeatPortions = {
  chickenPerAdult: 3,
  chickenPerKid: 2,
  steakPerAdult: 300,
  steakPerKid: 150,
  hamburgersPerAdult: 2,
  hamburgersPerKid: 1,
  sausagesPerAdult: 2,
  sausagesPerKid: 2,
}

export interface DrinkPortions {
  waterPerPerson: number
  softDrinksPerPerson: number
  beerPerAdult: number
  winePerAdult: number
  spiritsPerAdult: number
}

export const defaultDrinkPortions: DrinkPortions = {
  waterPerPerson: 0.5,
  softDrinksPerPerson: 0.5,
  beerPerAdult: 1,
  winePerAdult: 0,
  spiritsPerAdult: 0,
}

export interface GuestCounts {
  adults: number
  kids: number
  vegetarians: number
  vegans: number
  allergyGuests: AllergyGuest[]
  isOutdoor?: boolean
  portions?: MeatPortions
  drinkPortions?: DrinkPortions
}

export type Category = 'meat' | 'sides' | 'veggie' | 'drinks' | 'equipment'

export interface ShoppingItem {
  id: string
  category: Category
  nameKey: string
  customName?: string
  calculatedQty: number
  currentQty: number
  unitKey: string
  customUnit?: string
  purchased: boolean
  isCustom?: boolean
}

export interface SavedList {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  guestCounts: GuestCounts
  items: ShoppingItem[]
  shareId?: string
}

export interface PublicShare {
  shareId: string
  listId: string
  userId: string
  listName: string
  guestCounts: GuestCounts
  items: ShoppingItem[]
  sharedByName: string
  createdAt: Date
}
