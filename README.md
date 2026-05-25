# 📚 NexBook Manager - Book Management System

A sleek, robust, and responsive **Book Management System** built as an evaluation assessment. It leverages **React.js** for interactive UI, **Bootstrap** with modern custom stylesheets for stunning aesthetics, and **json-server** for a mock REST API database.

To deliver an exceptional evaluator experience, this project features a **Dual-Mode API layer**. When run locally, it communicates with the local REST API server (`json-server`). If deployed live (e.g. on Vercel or Netlify) or if the server goes offline, it automatically and seamlessly falls back to a fully interactive **LocalStorage-based database**. This guarantees that the live deployed URL is **100% functional** (supporting real-time additions, updates, and deletions) without requiring a third-party paid backend!

---

## ✨ Key Features

1. **Full CRUD Operations**:
   - **Create**: Add books with automatic validation (Title, Author, Genre, Publication Year).
   - **Read**: View books in a clean, responsive layout with beautiful custom visual covers and genre-specific badges.
   - **Update**: Edit existing book details via a unified, sleek modal form.
   - **Delete**: Safely remove books with double-confirmation dialogs.

2. **Advanced Filtering & Searching**:
   - **Instant Search**: Type in the search bar to filter books by **Title** or **Author** in real time.
   - **Genre Dropdown**: Filters books by genre. The options in the dropdown are **dynamically computed** from the actual books currently in the database.
   - **Multi-criteria Sorting**: Sort books alphabetically (**A-Z**, **Z-A**) or chronologically (**Newest First**, **Oldest First**).

3. **Premium Visual Aesthetics & UX**:
   - **Shimmering Skeleton Loader**: Shows polished animated skeletons while fetching data to eliminate layout shift and give a premium feel.
   - **Live Database Status Pill**: A header pill that glows green (`JSON REST API Online`) when connected to the local server, and amber (`Offline Database (LocalStorage)`) when operating in browser storage mode.
   - **Dynamic Book Covers**: Generates a rich, soft gradient background dynamically based on the hash of the book's title, making the library look vibrant and realistic.
   - **Micro-Animations**: Hover-lift effects on cards and buttons, pulsing indicators, and smooth modal fade-ins.

---

## 📂 Folder Structure

```text
Nexgensis Technologies ReactAssesment/
├── db.json                     # Seed database for local json-server
├── package.json                # Project configuration and dependency scripts
├── vite.config.js              # Vite server settings
├── public/                     # Static public assets
└── src/
    ├── main.jsx                # Application mounting point
    ├── App.jsx                 # Core reactive state and CRUD orchestrator
    ├── index.css               # Premium custom design system & keyframe animations
    ├── components/
    │   ├── Navbar.jsx          # Header with dynamic database status pill
    │   ├── FilterBar.jsx       # Toolbar for search, genre filters, sorting, and add triggers
    │   ├── BookList.jsx        # Grid component with shimmering skeleton loaders
    │   ├── BookCard.jsx        # Individual book card with gradient covers and actions
    │   └── BookFormModal.jsx   # Unified validation-equipped Add/Edit modal dialog
    └── services/
        └── api.js              # Intelligent dual-mode API client (Server ⇆ LocalStorage)
```

---

## 🚀 Local Setup Instructions

Follow these simple steps to run the application locally on your system:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended) installed.

### Step 1: Clone & Install Dependencies
Navigate into the project directory and install the required modules:
```bash
npm install
```
*This installs standard frontend libraries (`bootstrap`, `bootstrap-icons`) and dev utilities (`concurrently`, `json-server`).*

### Step 2: Run Both Frontend & Database Mock
We have prepared a single command to run both the Vite developer server and the `json-server` concurrently:
```bash
npm run dev:all
```

This starts:
- **React Frontend**: `http://localhost:5173`
- **JSON REST API Server**: `http://localhost:5001`

Open `http://localhost:5173` in your browser to experience the fully operational application connected to the local `db.json` database!

---

## 🌐 Deployment Details

This project is fully ready for 1-click deployment on **Vercel** or **Netlify**:

1. **How the Live Demo Remains Fully Functional**:
   Since static hosts cannot run active `json-server` background processes, our frontend API client (`src/services/api.js`) automatically detects that the server is unreachable and switches to **LocalStorage mode** in production.
   - Evaluators can open your live deployed URL, **add new books**, **edit entries**, and **delete books**, and the changes will persist right in their browser.
   - The status pill in the navbar will change to `Offline Database (LocalStorage)` to notify them of this elegant fallback.

---

## 🔗 Project Links
- **GitHub Repository**: `[INSERT_YOUR_GITHUB_REPO_URL_HERE]`
- **Live Deployed URL**: `[INSERT_YOUR_LIVE_DEPLOYED_URL_HERE]`
