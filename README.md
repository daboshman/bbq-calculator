# 🔥 מנגל מחשבון — BBQ Calculator

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A smart BBQ shopping list calculator. Enter the number and type of your guests (adults, kids, vegetarians, vegans, guests with food allergies) and get an automatically calculated, categorised shopping list with correct quantities for everything — meat, sides, drinks, and equipment.

**Live app** → hosted on Firebase Hosting (deploy your own instance below).

---

## Features

- 🧮 **Smart quantity calculation** — per-guest rules for every item
- 🥗 **Dietary breakdown** — separate tracking for vegetarians, vegans, and allergy guests
- ✏️ **Manual adjustments** — ±1 buttons per item with one-click reset
- ✅ **Purchase checklist** — mark items as bought with strikethrough style
- 💾 **Save & load lists** — stored in Firestore under your account
- 🔗 **Shareable links** — generate a read-only link requiring no login
- 🖨️ **Print-friendly** — clean print stylesheet
- 🌍 **3 languages** — Hebrew (RTL), English, Spanish — switchable instantly
- 🔐 **Google Sign-In** — Firebase Auth, no username/password to manage

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18 + Vite 5 + TypeScript 5    |
| Styling     | Tailwind CSS 3, Rubik font (Google) |
| Auth        | Firebase Authentication (Google)    |
| Database    | Firebase Firestore                  |
| Hosting     | Firebase Hosting                    |

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/daboshman/bbq-calculator.git
cd bbq-calculator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Copy the environment variable template:

```bash
cp .env.example .env
```

Open `.env` and fill in your Firebase project credentials — you'll find them in the **Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration**.

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXX
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Firebase Setup

### Enable Google Sign-In

1. Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Google** provider
3. Add `localhost` to Authorized domains (already there by default)

### Deploy Firestore rules

```bash
npm install -g firebase-tools
firebase login
firebase use bbq-calculator-d92f0
firebase deploy --only firestore:rules,firestore:indexes
```

### Deploy the app

```bash
npm run build
firebase deploy --only hosting
```

---

## Project Structure

```
src/
├── components/
│   ├── LoginPage.tsx         # Google Sign-In screen
│   ├── Header.tsx            # Sticky header with user info
│   ├── GuestForm.tsx         # Guest count inputs & allergy notes
│   ├── ShoppingList.tsx      # Categorised shopping list
│   ├── ListItem.tsx          # Single item row with ± controls
│   ├── AllergySection.tsx    # Highlighted allergy guest cards
│   ├── LanguageSwitcher.tsx  # HE / EN / ES toggle
│   ├── SharedListView.tsx    # Read-only public share view
│   └── SavedListsModal.tsx   # Saved list history modal
├── hooks/
│   ├── useAuth.ts            # Firebase Auth state
│   ├── useCalculator.ts      # Quantity calculation logic
│   └── useFirestore.ts       # Firestore save / load / share
├── i18n/
│   ├── translations.ts       # All strings in HE / EN / ES
│   └── context.tsx           # Language context + t() helper
├── lib/
│   └── firebase.ts           # Firebase app initialisation
├── types/
│   └── index.ts              # Shared TypeScript types
├── App.tsx                   # Root component & routing
└── main.tsx                  # React entry point
```

---

## License

MIT © 2025
