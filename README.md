## Product Explorer – React + TypeScript + Vite

Product Explorer is a modern React application demonstrating real-world frontend architecture using:
- React + TypeScript
- React Router
- TanStack React Query
- Zustand
- React Context
- localStorage persistence

The app includes dynamic product browsing, a cart sidebar, toast notifications, debounced search, theme toggling, and clean UI state management patterns.

### Features Overview

**Product Grid & Search**
- Product list fetched via React Query
- Debounced real-time search
- Grid layout with images
- Cached results and fast switching

**Product Details**
- Dependent query (enabled: !!id)
- Add-to-cart button
- Success toast feedback

**Global Cart Sidebar (Context)**
- Opens from the right
- Persisted using localStorage
- Triggered from navbar

**Toast Notifications (Zustand)**
- Global store for success/error/info
- Auto-dismiss after 3 seconds
- Manual close button
- ToastHost mounted at root

**Theme Toggle (Zustand + localStorage)**
- Light / Dark modes
- Theme persists across refresh
- Updates body class dynamically

**Notes Page**
- Demonstrates local UI state
- Saved note message feedback

### Architecture Overview
**1. Server State → React Query**
- Product list
- Product details
- Search-driven queries

React Query handles caching, refetching, stale data, retries, and error states.

**2. Global UI State → React Context**
CartSidebarContext manages:
- isOpen
- open(), close(), toggle()
- Persisted with useLocalStorage()

**3. Global Client State → Zustand**

Used for:
- Toast Notifications

            { id, type, message, timestamp, timeout? }

Store API:
- addToast()
- removeToast()
- toasts[]

Cart Store:
- Add/remove items
- Global cart count

Theme Store:
- theme (light/dark)
- toggleTheme()
- Persisted to localStorage

**4. Local UI State → useState**
Used where global state is unnecessary:
- Search input
- Notes page
- Temporary "saved" message


### Running the Project

            npm install
            npm run dev
Open:

            http://localhost:5173