## Homework 3 — Global Client State + Persistence + Notifications

Final Summary, Explanations & Conclusions:

### Step 1 — State Inventory
**Server State (lives in TanStack Query)**
These values come from the backend API and must stay in React Query, since they depend on fetching, caching, refetching, and error handling.
- Products list — fetched from https://dummyjson.com/products/search?q=...
- Single product details — fetched from https://dummyjson.com/products/:id

React Query manages:
- loading, error states, caching, stale data, background refresh

**Global Client State (shared across components)**
These are frontend-only states that must persist or be accessed in multiple places.
- Cart contents — managed via Zustand (useCartStore)
- Cart sidebar open/closed — managed via Context (SidebarContext)
- Theme (light/dark) — managed via Zustand (useThemeStore) and persisted to localStorage
- Toast notifications — managed via Zustand (useToastStore)

These states are shared across pages (Navbar, ProductDetail, ProductList, ToastHost), so global state tools are appropriate.

**Local UI State (inside individual components)**
These states are small UI behaviors that belong only to a single component.

Products Page:
- Search text — used only to control the search input.
- Debounced search value — internal UI mechanism for throttling the search.

ProductNotes Page:
- note — the text area’s current value.
- saved — temporary flag for “note saved” UI message.

About Page:
- No state — static content only.

Local UI states do not need to be global because no other component depends on them.

Conclusion:
- The product data and product details clearly belong in TanStack Query, since they come from the backend and require caching and network management.
- Global UI features like the cart, theme, notifications, and the cart sidebar belong in Zustand or Context, because they must be accessed across multiple components.
- Temporary UI behaviors like search input, note text, and saved messages are correctly handled with local useState, since they are not shared and do not persist.


### Step 2 — Cart Sidebar (Context-Based Global UI State)
**Step 2.1 — Chosen Sidebar: Cart Sidebar:**
What opens it?
- The “Cart (#)” button in the navbar.

Where does it appear?
- A sliding panel from the right side of the screen.

What it contains:
- List of items in cart
- Remove item button
- Clear cart
- Close button

**Step 2.2 — Context Design (in words)**
The CartSidebarContext contains:

      {
        isOpen: boolean
        open(): void
        close(): void
        toggle(): void
      }

- The provider wraps the entire application, so any component can open/close the cart.
- The Navbar triggers actions (toggle()).
- The CartSidebar component reads isOpen to determine visibility.

**Step 2.3 — UI Implementation Description**
Navbar has a button:
- Cart (2) → calls toggle()
- When open, the sidebar slides in from the right using CSS transitions.
- The sidebar listens to isOpen and animates accordingly.

Inside the sidebar:
- Item list
- Remove per item
- Clear cart
- Close button

### Step 3 — Persist Cart Sidebar with Custom localStorage Hook
**Step 3.1 — Custom Hook Explanation**
What the hook receives:
- key — the localStorage key name (e.g., "sidebar-open")
- defaultValue — initial fallback value (e.g., false)

How the logic works:
- On first load:
  - The hook tries to read localStorage.getItem(key).
  - If a valid value exists, it parses and uses it.
  - If missing or invalid, it falls back to the provided defaultValue.

- On every state change:
  - Whenever the stored value updates, the hook writes the new value back into localStorage using localStorage.setItem(key, JSON.stringify(value)).

Where the hook is used:
- The hook is used inside the CartSidebar Context Provider, so the persistence is handled globally and cleanly.
- Components do not need to worry about localStorage — they rely on context only.

SSR / Non-browser note:
- The hook safely wraps localStorage access in try/catch, preventing crashes in environments without window (e.g., SSR).

**Step 3.2 — Persistence Test Results**
How the hook works:
- The useLocalStorage hook loads an initial value by checking localStorage using a given key.
- If a saved value exists, it restores it; if not, it falls back to the provided default.
- Whenever the sidebar state changes, the hook automatically writes the new value back into localStorage.
- This ensures the sidebar state is preserved even after a full page refresh.

Test Results:
- ✔ Opened sidebar, refreshed → still open
- ✔ Closed sidebar, refreshed → still closed

### Step 4 — Global Toast Store (Zustand)
**Step 4.1 — Chosen Library: Zustand**
I chose Zustand because:
- Zustand is extremely lightweight and simple to set up, making it perfect for small global states like notifications. 
- It does not require Providers or boilerplate, so I can access the store from anywhere in the app with minimal code.

Store location:
- src/stores/toastStore.ts

**Step 4.2 — Notification Shape**
Each toast:

      {
        id: number
        type: "success" | "error" | "info"
        message: string
        timeout?: number
        timestamp?: number
      }

My Zustand store exposes the following actions:
- get list of notifications → stored in toasts: Toast[]
- add notification → addToast(toast)
- remove notification by id → removeToast(id)
- clear all notifications → clearAll()

**Step 4.3 — ToastHost Component Explanation**
Description of the <ToastHost> Component:
- My project includes a ToastHost component responsible for displaying all active notifications.

Here is what it does:
1. Subscribes to the global Zustand toast store
- It uses useToastStore((s) => s.toasts) to get the list of current toasts and removeToast to dismiss them.
2. Renders a stack of toast messages
- Each toast appears as a small floating card in the top-right corner of the screen.
- The component maps over all toasts and renders them with different background colors based on their type:
  - success → green
  - error → red
  - info → blue

3. Each toast includes a close button
- Clicking “×” triggers removeToast(id) and deletes the toast immediately.
4. Toasts automatically disappear after 5 seconds
- When a toast is added, the store gives it:
  - a timestamp
  - a default timeout of 5000 ms

- A small timer in ToastHost checks each toast and removes it automatically after 5 seconds.
- This ensures the UI stays clean without requiring user interaction.

5. Mounted high in the application layout
- <ToastHost /> is included inside the main <App /> (under the navbar), so it can display global notifications from anywhere in the app.

### Step 5 — Connect Toasts to TanStack Query Events
**Step 5.1 — Success Toast Scenario**
Example:
- User clicks “Add to Cart”
- Toast appears: “Added to cart”
- Show screenshot of this moment

**Step 5.2 — Error Toast Scenario**
Example:
- Break the API or search for a wrong URL
- TanStack Query throws an error
- Toast appears: “Failed to load products”
- Show screenshot of this moment

### Step 6 — Optional Bonuses Completed
Bonus A — Theme Toggle (Zustand + localStorage)
- I implemented a global theme (light/dark) using Zustand.

What I added:
- A global Zustand store: useThemeStore
- theme: "light" or "dark"
- toggleTheme() action: switches between light & dark
- Theme is persisted to localStorage so it stays after refresh
- The <Navbar> contains a button to toggle the theme
- The <body> element receives a CSS class (light or dark)
- I updated the CSS to support both themes

### Step 9 — Reflection
Where each type of state lives:

TanStack Query
- Products list (search results)
- Single product details
- TanStack Query manages fetching, caching, error handling, and refetching.

React Context
- Cart sidebar open/close state

Zustand
- Toasts (notifications) → success/error/info
- Theme mode (light/dark) → persisted to localStorage
- Cart contents → items array, add/remove operations

Local useState
- Search input (Products page)
- Notes input & “saved” flag (ProductNotes page)
- Temporary UI values that do not need global storage

Example where global state was correct:
- The cart sidebar needed to open from the Navbar and update the UI globally.
This cannot be local state — Context is the right solution.

Example where local state was intentionally NOT global:
- The search input should NOT be global because it belongs only to the Products page.

What I learned:
- Server state belongs in TanStack Query, not in Zustand or Context.
- Global state is powerful but must be used only when multiple components depend on it.
- Zustand is perfect for simple global logic (cart, theme, notifications).
- Context works best for UI layout state such as the cart drawer.
- Combining Query + Zustand + Context creates a scalable real-world-level state architecture.