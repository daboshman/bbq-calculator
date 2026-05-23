# Contributing to מנגל מחשבון

Thank you for your interest in contributing! Below are guides for the two most common extension points.

---

## Adding a new language

All user-visible strings live in a single file: [`src/i18n/translations.ts`](src/i18n/translations.ts).

### Step-by-step

1. **Add the language code** to the `Language` union type at the top of the file:

```typescript
// Before
export type Language = 'he' | 'en' | 'es'

// After (adding French)
export type Language = 'he' | 'en' | 'es' | 'fr'
```

2. **Add a translation object** as a sibling of `he`, `en`, and `es`. Copy the `en` block and translate all values:

```typescript
export const translations = {
  he: { ... },
  en: { ... },
  es: { ... },
  // ─── New ───
  fr: {
    appName: 'Calculateur BBQ',
    appTagline: 'Planifiez votre BBQ parfait',
    // ... translate every key
  },
} as const
```

> **Tip:** TypeScript will give you a compile error for every missing key, so you can't accidentally skip one.

3. **Add the language to the switcher** in [`src/components/LanguageSwitcher.tsx`](src/components/LanguageSwitcher.tsx):

```typescript
const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: 'he', flag: '🇮🇱', label: 'עב' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },  // ← add this
]
```

4. **Handle RTL** if the language is right-to-left. In [`src/i18n/context.tsx`](src/i18n/context.tsx), update `isRTL`:

```typescript
const isRTL = lang === 'he' // add more RTL codes here if needed
```

That's it — the app re-renders and switches direction automatically.

---

## Adding a new food category or item

### Adding a new item to an existing category

All calculation logic lives in [`src/hooks/useCalculator.ts`](src/hooks/useCalculator.ts) inside the `calculateItems` function.

**1. Add the calculation inside `calculateItems`:**

```typescript
// Example: add "Bread rolls" to the sides category
const rollsQty = sidesAdults * 2 + sidesKids * 1
if (rollsQty > 0)
  items.push(makeItem('rolls', 'sides', 'rolls', rollsQty, 'unitPieces'))
```

The `makeItem` signature is:
```typescript
makeItem(id, category, nameKey, quantity, unitKey)
```

**2. Add the translation strings** to all three languages in `translations.ts`:

```typescript
// In each language block:
rolls: 'Bread Rolls',         // en
rolls: 'לחמניות',             // he
rolls: 'Panecillos',          // es
```

### Adding a new category

1. **Add the category type** to `src/types/index.ts`:

```typescript
export type Category = 'meat' | 'sides' | 'veggie' | 'drinks' | 'equipment' | 'myNewCategory'
```

2. **Add the category label key** to `translations.ts` (in all three languages):

```typescript
catMyNewCategory: '🍰 My New Category',
```

3. **Register the category** in `src/components/ShoppingList.tsx`:

```typescript
const CATEGORIES: { id: Category; labelKey: TranslationKey }[] = [
  { id: 'meat',          labelKey: 'catMeat' },
  // ...
  { id: 'myNewCategory', labelKey: 'catMyNewCategory' },  // ← add this
]
```

4. **Use the new category** in your `makeItem` calls inside `useCalculator.ts`.

---

## Code style

- Prettier is configured — run `npm run format` before committing.
- ESLint runs on `npm run lint`.
- Keep components small; prefer composition over large monoliths.
- All strings must go through the `t()` helper — no hardcoded user-facing text.
