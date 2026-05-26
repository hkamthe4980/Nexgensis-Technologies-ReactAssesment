# 📚 My React Book Management Project!

Hi there! This is my completed React assignment for the **Book Management System**. 

I wanted to make this application look super clean, modern, and simple to understand! I built the frontend using **React JS** and styled it using **Bootstrap** (with some custom CSS for nice colors, smooth hover lifts, and glowing status badges). For API requests, I used **Axios** to do all the CRUD operations.

To make sure my project doesn't break when deployed online (since Vercel cannot run a local backend database), I added a **LocalStorage fallback** inside the Axios catch blocks. This means if my local database server is offline or when you visit the live deployed URL, the application automatically switches to saving your books inside your web browser's storage! It's 100% working and you can add, edit, and delete books live!

---

## 🌟 Cool Features I Built

1. **Full CRUD Operations**:
   * **Add new books** using a clean popup form (with validation checks so you don't enter future years or empty titles!).
   * **Edit book details** instantly.
   * **Delete books** with a simple confirmation prompt.
2. **Dynamic Genre Badges**: Each genre gets its own colored badge automatically (like purple for Dystopian, green for Fantasy, blue for Sci-Fi, and yellow for Biography).
3. **Soft Cover Gradients**: The cards generate a pretty gradient background based on the book's title so there are no empty image placeholders!
4. **Shimmering Skeleton Loading**: While Axios fetches the books, a neat shimmering card animation is shown so the page doesn't look blank.
5. **Real-time Toolbar**:
   * **Search bar** to find books by Title or Author instantly as you type.
   * **Filter by Genre** dynamically loaded from current books.
   * **Sort selector** to arrange books A-Z, Z-A, or by Year.
6. **Live Connection Pill**: A badge in the header shows if you are connected to the live JSON REST API (`REST API Online`) or using the browser's storage (`Offline Database`).

---

## 🚀 How to Run this Locally

Running this project on your machine is super easy. Just follow these steps:

### 1. Install all dependencies
First, open your command terminal in this directory and install Node modules:
```bash
npm install
```
*(This installs React, Axios, Bootstrap, and concurrently/json-server to run the mock database).*

### 2. Start the Frontend & Database together!
I set up a single shortcut command that boots both Vite (frontend) and JSON Server (backend database) at the same time:
```bash
npm run dev:all
```

* **Frontend** runs on: `http://localhost:5173`
* **Mock REST Database** runs on port: `http://localhost:5001/books` (watching `db.json`)

Now, just open `http://localhost:5173` in your browser and you are good to go!

---

## 🌐 How to Deploy to Vercel/Netlify

1. Push your code to a public repository on your **GitHub** account.
2. Go to **Vercel** or **Netlify** and click "Import Project".
3. Log in with your GitHub and select this repository.
4. **Vercel Build Settings**:
   * **Framework Preset**: Choose `Vite` (Vercel usually auto-detects it).
   * **Root Directory**: Select the main repository folder (not `src`).
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Click **Deploy** and you will get your live link in less than a minute! 

*(Because of the Axios LocalStorage fallback I wrote, the live link will be fully operational. You can add, edit, and delete books right in the browser!)*

---

## 🔗 Project Submission Links
* **GitHub Repository Link**: `[INSERT_YOUR_GITHUB_REPO_URL]`
* **Live Deployed Site URL**: `[INSERT_YOUR_LIVE_DEPLOYED_URL]`

Hope you like my code and UI design! Let me know if you have any questions! 😊
