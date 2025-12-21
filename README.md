## Product Explorer – Advanced 1 (i18n + PrimeReact)

This project continues from an existing Vite + React store application
as part of **Advanced 1 homework**.

Starting point: existing store app using TanStack Query  
API used: DummyJSON (https://dummyjson.com)


### Tech Stack

- React + TypeScript + Vite
- React Router
- TanStack React Query
- Zustand
- React Context
- i18next + react-i18next
- PrimeReact + PrimeIcons
- localStorage persistence

### Step 1 – Internationalization (i18n)

- Added i18next + react-i18next
- Initialized i18n once in `src/i18n.ts`
- Used namespaces:
  - `common` – navigation, buttons, generic UI
  - `products` – product list & detail UI
- Supported languages:
  - English (`en`)
  - Hebrew (`he`)

### Step 2 – i18n Usage

Translated all visible UI strings:
- Navbar
- Products list
- Product detail
- Cart sidebar
- Notes page

Demonstrated required i18n features:
- **Interpolation** – cart item count
- **Pluralization** – product results count
- **`<Trans />` usage** – embedded link in About page

### Step 3 – Language Switcher + Persistence

- Language switcher in header
- Uses `i18n.changeLanguage()` for immediate UI updates
- Selected language persisted in `localStorage`
- Restored on page reload
- Default language: `en`

### Step 4 – RTL Support (Hebrew)

- When Hebrew is active:
  - `document.documentElement.dir = "rtl"`
  - `document.documentElement.lang = "he"`
- Fixed RTL layout issues (alignment, spacing, icons)

### Step 5 – PrimeReact DataTable

- Installed PrimeReact and PrimeIcons
- Converted products list to PrimeReact DataTable
- Data driven directly from TanStack Query (no duplicated server state)

**Columns:**
- Title
- Price
- Category
- Image
- Action (View details)

**Features:**
- Sorting (title, price)
- Pagination (8 rows per page)

### Step 6 – PrimeReact Theme Switch

- Implemented dynamic PrimeReact theme switching
- Themes used:
  - `lara-light-blue`
  - `lara-dark-blue`
- Theme switcher in header
- Selected theme persisted in `localStorage`
- Default theme: `dark`

**localStorage key:** `theme`

### Bonus A – Locale-aware Price Formatting

- Prices formatted using `Intl.NumberFormat`
- Currency adapts to active language:
  - EN → USD
  - HE → ILS
- Prices update immediately on language switch

### Running the Project

            npm install
            npm run dev
Open:

            http://localhost:5173