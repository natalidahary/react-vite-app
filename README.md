# CalmSpace – A Minimal Digital Workspace

- CalmSpace is a simple React application built with Vite, showcasing core React concepts such as component structure, state management, routing, and clean UI styling.
- It is designed as a calm, minimal workspace to help users focus and set daily intentions.

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
- A simple navigation bar allows switching between pages.

### How to Run the Project
- Clone the repository and install dependencies:

            npm install
            npm run dev

- Then open the provided local URL, usually:

            http://localhost:5173
