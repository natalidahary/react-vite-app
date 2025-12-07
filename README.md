# CalmSpace – A Minimal Digital Workspace

- CalmSpace is a simple React application built with Vite, showcasing core React concepts such as component structure, state management, routing, and clean UI styling.
- It demonstrates core modern React concepts including:
    - Component structure
    - State management with hooks
    - Client-side routing
    - Server state management using TanStack React Query
    - Clean UI styling for a calm user experience

### Features Implemented

1. Vite + React Setup
- The project was created using Vite for a fast development environment.

            npm create vite@latest calmspace -- --template react
            npm install
            npm run dev

2. DailyNote Component (useState)
- A custom component that allows the user to write a daily intention.
    - Uses useState to manage input.
    - Displays a saved message when text is entered.
    - Includes a styled textarea and card-like layout.

- Core logic:

            const [note, setNote] = useState("");

            const savedMessage = note.trim()
            ? "Your note is saved in CalmSpace."
            : "";

3. React Router – Multi-Page Navigation
- React Router was added to support multiple pages:

            npm install react-router-dom

- Routes created:
    - / → Dashboard (DailyNote component)
    - /about → About page describing CalmSpace
    - /products → Products list
    - /products/:id → Product detail page
- A simple navigation bar allows switching between pages.

4. TanStack React Query — Server State Management
- React Query was installed and configured globally:

            npm install @tanstack/react-query

Products List Page (List Query):
- Uses useQuery to fetch a list of products and display:
    - Loading state
    - Error state
    - Rendered list of items
    - Product Detail Page (Dependent Query)

- The detail page:
    - Reads the id from the URL
    - Fetches details using useQuery
    - Uses enabled: !!id to ensure dependent query behavior

5. Query Key with Filters
- A search bar was added to the Products page:
    - Search value stored in component state
    - Debounced input to prevent excessive requests
    - Query key includes the search term:
    - queryKey: ["products", debouncedSearch]

- This demonstrates dynamic caching behavior in React Query.

### How to Run the Project
- Clone the repository and install dependencies:

            npm install
            npm run dev

- Then open the provided local URL, usually:

            http://localhost:5173
