import React from 'react';
import BookCard from './BookCard';

// Renders a beautiful skeleton card that matches BookCard's layout for smoother UX
const SkeletonCard = () => {
  return (
    <div className="card h-100 shadow-sm border-0 skeleton-card">
      <div className="skeleton-image" style={{ height: '180px', backgroundColor: '#e2e8f0' }}></div>
      <div className="card-body p-4">
        <div className="skeleton-text skeleton-badge mb-3"></div>
        <div className="skeleton-text skeleton-title mb-2"></div>
        <div className="skeleton-text skeleton-title w-75 mb-4"></div>
        <div className="skeleton-text skeleton-author w-50 mb-3"></div>
        <div className="mt-auto pt-3 border-top border-light d-flex gap-2">
          <div className="skeleton-button flex-grow-1"></div>
          <div className="skeleton-button flex-grow-1"></div>
        </div>
      </div>
    </div>
  );
};

const BookList = ({ books, loading, onEdit, onDelete, onClearFilters }) => {
  if (loading) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="skeleton-text w-25" style={{ height: '24px' }}></div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="col">
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="card shadow-sm border-0 text-center py-5 px-4 my-4 bg-light">
        <div className="card-body">
          <div className="mb-4">
            <i className="bi bi-journal-x fs-1 text-muted opacity-50"></i>
          </div>
          <h4 className="fw-bold text-dark">No Books Found</h4>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: '420px' }}>
            We couldn't find any books matching your search query or filter selection. Try adjusting your query or resetting the filter parameters.
          </p>
          <button className="btn btn-primary px-4 py-2" onClick={onClearFilters}>
            <i className="bi bi-arrow-counterclockwise me-2"></i>
            Reset Search & Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
        <span>
          Showing <strong>{books.length}</strong> {books.length === 1 ? 'book' : 'books'}
        </span>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {books.map((book) => (
          <div key={book.id} className="col">
            <BookCard book={book} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
