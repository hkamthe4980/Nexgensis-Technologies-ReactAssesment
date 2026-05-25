const API_URL = 'http://localhost:5001/books';

// Initial seed books to populate localStorage if the local server is down
const INITIAL_BOOKS = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: "1960"
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: "1949"
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: "1925"
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    year: "1965"
  },
  {
    id: "5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    year: "1937"
  },
  {
    id: "6",
    title: "Educated",
    author: "Tara Westover",
    genre: "Biography",
    year: "2018"
  },
  {
    id: "7",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Mystery",
    year: "2019"
  },
  {
    id: "8",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "History",
    year: "2011"
  }
];

// Helper to initialize localStorage books if not present
const getLocalStorageBooks = () => {
  const books = localStorage.getItem('books_db');
  if (!books) {
    localStorage.setItem('books_db', JSON.stringify(INITIAL_BOOKS));
    return INITIAL_BOOKS;
  }
  return JSON.parse(books);
};

const setLocalStorageBooks = (books) => {
  localStorage.setItem('books_db', JSON.stringify(books));
};

// Global state to track database mode
let isOfflineMode = false;

export const databaseStatus = {
  isOffline: () => isOfflineMode,
};

// CRUD Operations
export const bookApi = {
  // Read all books
  getAll: async () => {
    try {
      const response = await fetch(API_URL, { signal: AbortSignal.timeout(2000) });
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      isOfflineMode = false;
      return { data, source: 'API Server (db.json)' };
    } catch (error) {
      console.warn('API Server unreachable, falling back to LocalStorage', error);
      isOfflineMode = true;
      const data = getLocalStorageBooks();
      return { data, source: 'Local Storage (Production Fallback)' };
    }
  },

  // Create a new book
  create: async (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString() // Always generate standard string ID
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
        signal: AbortSignal.timeout(2000)
      });
      if (!response.ok) throw new Error('Server write failed');
      const data = await response.json();
      isOfflineMode = false;
      return data;
    } catch (error) {
      console.warn('API Server write failed, applying to LocalStorage', error);
      isOfflineMode = true;
      const books = getLocalStorageBooks();
      books.push(newBook);
      setLocalStorageBooks(books);
      return newBook;
    }
  },

  // Update a book
  update: async (id, bookData) => {
    // Ensure ID remains a string
    const updatedBook = { ...bookData, id: id.toString() };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
        signal: AbortSignal.timeout(2000)
      });
      if (!response.ok) throw new Error('Server update failed');
      const data = await response.json();
      isOfflineMode = false;
      return data;
    } catch (error) {
      console.warn('API Server update failed, applying to LocalStorage', error);
      isOfflineMode = true;
      const books = getLocalStorageBooks();
      const index = books.findIndex(b => b.id.toString() === id.toString());
      if (index !== -1) {
        books[index] = updatedBook;
        setLocalStorageBooks(books);
      }
      return updatedBook;
    }
  },

  // Delete a book
  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(2000)
      });
      if (!response.ok) throw new Error('Server delete failed');
      isOfflineMode = false;
      return true;
    } catch (error) {
      console.warn('API Server delete failed, applying to LocalStorage', error);
      isOfflineMode = true;
      const books = getLocalStorageBooks();
      const filtered = books.filter(b => b.id.toString() !== id.toString());
      setLocalStorageBooks(filtered);
      return true;
    }
  }
};
