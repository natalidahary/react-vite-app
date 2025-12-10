# Product Explorer – React + TypeScript + Vite

- Product Explorer is a modern React application built with Vite, TypeScript, React Router, and TanStack React Query.
- It demonstrates clean architecture, modular components, typed API communication, debounced search, and dynamic routing.
- This app allows users to:
    - Browse a list of products
    - Search products with real-time debounced input
    - View detailed product information
    - Write and save personal notes
    - Explore a well-structured, scalable React codebase

### Features Implemented

1. Vite + React + TypeScript
- The app was created with Vite for a fast and modern development setup.

            npm create vite@latest my-app -- --template react-ts
            npm install
            npm run dev

2. API Selection
- For this project, the API chosen is DummyJSON.
- List endpoint: /products
- Detail endpoint: /products/:id.”
- These endpoints are used for the main product listing and product detail pages.

3. Product List Page (React Query List Query)
- The /products page:
    - Fetches products using useQuery
    - Shows loading & error states
    - Renders a product list
    - Supports debounced search
    - Uses React Query's smart caching with:

            queryKey: ["products", searchTerm]

- This demonstrates dynamic caching and automatic refetching.

4. Product Detail Page (Dependent Query)
- The /products/:id page:
- Reads the product ID from the URL
- Fetches detailed product information
- Uses:

            enabled: !!id

- to ensure the query only runs when ID is defined → This is called a dependent query.

5. Product Notes Page
- The user can:
    - Write notes
    - Save them using a reusable <SharedButton />
    - Show a success message
    - Clear the input after saving


6. React Router – Multi-Page Navigation
- Routes:

            /                → Product List  
            /products/:id    → Product Details  
            /notes           → Notes Page  
            /about           → About page  

7. TanStack React Query – Server State Management
- Installed with:

            npm install @tanstack/react-query
            npm install @tanstack/react-query-devtools

- Used for:
    - Server data caching
    - Automatic refetching
    - Query invalidation
    - Error & loading state management
    - The global setup in main.tsx includes:

            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>

8. Query Key with Filters
- The search field on the Products page updates the query key:

            queryKey: ["products", debouncedSearch]

- React Query automatically:
    - Caches search results separately
    - Avoids duplicate refetches
    - Restores old results instantly
    - Makes searching smoother
    - The debounce hook prevents unnecessary API calls.

### How to Run the Project
- Clone the repository and install dependencies:

            npm install
            npm run dev

- Then open the provided local URL, usually:

            http://localhost:5173