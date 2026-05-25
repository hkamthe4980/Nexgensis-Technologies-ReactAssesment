import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import BookList from './components/BookList';
import BookFormModal from './components/BookFormModal';
import { bookApi, databaseStatus } from './services/api';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  // Filter & Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  // Success alert/toast message
  const [alertMessage, setAlertMessage] = useState(null);

  // Load books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (showSkeleton = true) => {
    if (showSkeleton) setLoading(true);
    setError(null);
    try {
      // Simulate brief network latency for shimmering skeletons appreciation
      const [, result] = await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 600)),
        bookApi.getAll()
      ]);
      setBooks(result.data);
      setIsOffline(databaseStatus.isOffline());
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books. Please try reloading the application.');
    } finally {
      setLoading(false);
    }
  };

  // Triggers alert with auto-fadeout
  const showAlert = (message, type = 'success') => {
    setAlertMessage({ message, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 4000);
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

  const handleSaveBook = async (formData) => {
    try {
      if (activeBook) {
        // Edit mode
        await bookApi.update(activeBook.id, formData);
        showAlert(`Successfully updated "${formData.title}"!`);
      } else {
        // Add mode
        await bookApi.create(formData);
        showAlert(`Successfully added "${formData.title}" to the library!`);
      }
      handleCloseModal();
      // Fast refresh books without full skeleton flash for smooth workflow
      fetchBooks(false);
    } catch (err) {
      console.error(err);
      showAlert('An error occurred while saving the book.', 'danger');
    }
  };

  const handleDeleteBook = async (id) => {
    const bookToDelete = books.find((b) => b.id.toString() === id.toString());
    if (!bookToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${bookToDelete.title}" by ${bookToDelete.author}?`
    );

    if (confirmDelete) {
      try {
        await bookApi.delete(id);
        showAlert(`Removed "${bookToDelete.title}" from the system.`);
        fetchBooks(false);
      } catch (err) {
        console.error(err);
        showAlert('Failed to delete the book.', 'danger');
      }
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSortBy('title-asc');
  };

  // Compute list of unique genres dynamically based on actual database books
  const uniqueGenres = [...new Set(books.map((b) => b.genre))].filter(Boolean).sort();

  // In-memory Filtering and Sorting for high response speed
  const filteredAndSortedBooks = books
    .filter((book) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);

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
        return parseInt(b.year, 10) - parseInt(a.year, 10);
      }
      if (sortBy === 'year-asc') {
        return parseInt(a.year, 10) - parseInt(b.year, 10);
      }
      return 0;
    });

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Header / Navbar */}
      <Navbar isOffline={isOffline} />

      {/* Main Content Area */}
      <div className="container">
        
        {/* Persistent alerts */}
        {alertMessage && (
          <div className={`alert alert-${alertMessage.type} alert-dismissible fade show shadow-sm border-0 mb-4 d-flex align-items-center gap-2`} role="alert">
            <i className={`bi ${alertMessage.type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'} fs-5`}></i>
            <div className="fw-semibold">{alertMessage.message}</div>
            <button type="button" className="btn-close ms-auto shadow-none" onClick={() => setAlertMessage(null)} aria-label="Close"></button>
          </div>
        )}

        {/* Global Error Banner */}
        {error && (
          <div className="alert alert-danger shadow-sm border-0 mb-4 p-4" role="alert">
            <h4 className="alert-heading fw-bold">
              <i className="bi bi-x-circle-fill me-2"></i>
              System Error
            </h4>
            <p className="mb-0">{error}</p>
            <button className="btn btn-outline-danger mt-3" onClick={() => fetchBooks()}>
              <i className="bi bi-arrow-clockwise me-2"></i>
              Retry Fetching
            </button>
          </div>
        )}

        {/* Toolbar & Filters (Only show if no major connection error) */}
        {!error && (
          <>
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

            {/* Core Book List Grid */}
            <BookList
              books={filteredAndSortedBooks}
              loading={loading}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteBook}
              onClearFilters={handleClearFilters}
            />
          </>
        )}

      </div>

      {/* Add / Edit Form Modal Dialog */}
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
