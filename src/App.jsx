import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import BookList from './components/BookList';
import BookFormModal from './components/BookFormModal';

// Local json-server address
const API_URL = 'http://localhost:5001/books';

// Simple seed data in case database is offline (fallback)
const INITIAL_BOOKS = [
  { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", year: "1960" },
  { id: "2", title: "1984", author: "George Orwell", genre: "Dystopian", year: "1949" },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", year: "1925" },
  { id: "4", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", year: "1965" },
  { id: "5", title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year: "1937" },
  { id: "6", title: "Educated", author: "Tara Westover", genre: "Biography", year: "2018" },
  { id: "7", title: "The Silent Patient", author: "Alex Michaelides", genre: "Mystery", year: "2019" },
  { id: "8", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "History", year: "2011" }
];

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Search, Genre, and Sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');

  // Modal open/close states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  // Success message alert
  const [alertMessage, setAlertMessage] = useState(null);

  // Helper to load books from localStorage if the server fails
  const getLocalStorageBooks = () => {
    const local = localStorage.getItem('books_db');
    if (!local) {
      localStorage.setItem('books_db', JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return JSON.parse(local);
  };

  // Helper to save books to localStorage
  const saveLocalStorageBooks = (updatedBooks) => {
    localStorage.setItem('books_db', JSON.stringify(updatedBooks));
  };

  // Load books from JSON Server or LocalStorage fallback
  const fetchBooks = () => {
    setLoading(true);
    axios.get(API_URL)
      .then((response) => {
        setBooks(response.data);
        setIsOffline(false);
        setLoading(false);
      })
      .catch((error) => {
        console.warn('JSON server offline! Falling back to LocalStorage.', error);
        setBooks(getLocalStorageBooks());
        setIsOffline(true);
        setLoading(false);
      });
  };

  // Run on start
  useEffect(() => {
    // Artificial 500ms delay so the beautiful skeleton cards can be appreciated
    const timer = setTimeout(() => {
      fetchBooks();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Helper for floating alerts
  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleOpenAddModal = () => {
    setActiveBook(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setActiveBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveBook(null);
  };

  // Unified Save (handles both Add and Edit)
  const handleSaveBook = (formData) => {
    if (activeBook) {
      // 1. UPDATE EXISTING BOOK (Edit Mode)
      const updatedBook = { ...formData, id: activeBook.id };

      axios.put(`${API_URL}/${activeBook.id}`, updatedBook)
        .then(() => {
          showAlert(`Successfully updated "${formData.title}"!`);
          fetchBooks();
          handleCloseModal();
        })
        .catch(() => {
          // Offline fallback
          const localList = getLocalStorageBooks();
          const newList = localList.map((b) => b.id.toString() === activeBook.id.toString() ? updatedBook : b);
          saveLocalStorageBooks(newList);
          
          showAlert(`Updated "${formData.title}" (Local Storage Saved)!`);
          fetchBooks();
          handleCloseModal();
        });
    } else {
      // 2. CREATE NEW BOOK (Add Mode)
      const newBook = { ...formData, id: Date.now().toString() };

      axios.post(API_URL, newBook)
        .then(() => {
          showAlert(`Successfully added "${formData.title}"!`);
          fetchBooks();
          handleCloseModal();
        })
        .catch(() => {
          // Offline fallback
          const localList = getLocalStorageBooks();
          localList.push(newBook);
          saveLocalStorageBooks(localList);

          showAlert(`Added "${formData.title}" (Local Storage Saved)!`);
          fetchBooks();
          handleCloseModal();
        });
    }
  };

  // Delete Book handler
  const handleDeleteBook = (id) => {
    const bookToDelete = books.find((b) => b.id.toString() === id.toString());
    if (!bookToDelete) return;

    if (window.confirm(`Are you sure you want to delete "${bookToDelete.title}"?`)) {
      axios.delete(`${API_URL}/${id}`)
        .then(() => {
          showAlert(`Removed "${bookToDelete.title}" from library.`);
          fetchBooks();
        })
        .catch(() => {
          // Offline fallback
          const localList = getLocalStorageBooks();
          const newList = localList.filter((b) => b.id.toString() !== id.toString());
          saveLocalStorageBooks(newList);

          showAlert(`Removed "${bookToDelete.title}" (Local Storage Updated).`);
          fetchBooks();
        });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSortBy('title-asc');
  };

  // Get list of unique genres from the current books
  const uniqueGenres = [...new Set(books.map((b) => b.genre))].filter(Boolean).sort();

  // Filter and sort logic (instant responsiveness)
  const filteredAndSortedBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === 'All' || book.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === 'year-desc') {
        return parseInt(b.year) - parseInt(a.year);
      }
      if (sortBy === 'year-asc') {
        return parseInt(a.year) - parseInt(b.year);
      }
      return 0;
    });

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Navbar with connection status */}
      <Navbar isOffline={isOffline} />

      <div className="container">
        
        {/* Floating alerts */}
        {alertMessage && (
          <div className="alert alert-success alert-dismissible fade show shadow-sm border-0 mb-4 d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-check-circle-fill fs-5"></i>
            <div className="fw-semibold">{alertMessage}</div>
            <button type="button" className="btn-close ms-auto shadow-none" onClick={() => setAlertMessage(null)}></button>
          </div>
        )}

        {/* Toolbar & Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          genres={uniqueGenres}
          onAddClick={handleOpenAddModal}
        />

        {/* Main Grid View */}
        <BookList
          books={filteredAndSortedBooks}
          loading={loading}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteBook}
          onClearFilters={handleClearFilters}
        />

      </div>

      {/* Add / Edit Form Modal */}
      <BookFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBook}
        book={activeBook}
      />
    </div>
  );
}

export default App;
