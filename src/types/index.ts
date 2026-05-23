export interface AllergyGuest {
  id: string
  note: string
}

export interface MeatPortions {
  chickenPerAdult: number
  chickenPerKid: number
  steakPerAdult: number
  steakPerKid: number
}

export const defaultMeatPortions: MeatPortions = {
  chickenPerAdult: 3,
  chickenPerKid: 2,
  steakPerAdult: 300,
  steakPerKid: 150,
}

export interface GuestCounts {
  adults: number
  kids: number
  vegetarians: number
  vegans: number
  allergyGuests: AllergyGuest[]
  portions?: MeatPortions
}

export type Category = 'meat' | 'sides' | 'veggie' | 'drinks' | 'equipment'

export interface ShoppingItem {
  id: string
  category: Category
  nameKey: string
  calculatedQty: number
  currentQty: number
  unitKey: string
  purchased: boolean
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
