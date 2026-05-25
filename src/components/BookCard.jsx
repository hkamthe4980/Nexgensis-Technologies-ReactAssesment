import React from 'react';

// Dynamic genre badge styles for premium visuals
const getGenreBadgeClass = (genre) => {
  const normalized = genre.toLowerCase();
  if (normalized.includes('fiction')) return 'bg-info-subtle text-info border-info-subtle';
  if (normalized.includes('sci-fi') || normalized.includes('science')) return 'bg-primary-subtle text-primary border-primary-subtle';
  if (normalized.includes('fantasy')) return 'bg-success-subtle text-success border-success-subtle';
  if (normalized.includes('mystery') || normalized.includes('thriller')) return 'bg-danger-subtle text-danger border-danger-subtle';
  if (normalized.includes('dystopian')) return 'bg-purple-subtle text-purple border-purple-subtle';
  if (normalized.includes('biography') || normalized.includes('history')) return 'bg-warning-subtle text-warning-emphasis border-warning-subtle';
  return 'bg-secondary-subtle text-secondary border-secondary-subtle';
};

// Generates a soft gradient cover class based on title hash for visual diversity
const getCoverGradientClass = (title) => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Indigo/Purple
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Blue/Cyan
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // Pink/Peach
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Magenta/Pink
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // Green/Teal
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Amber/Orange
  ];
  let sum = 0;
  for (let i = 0; i < title.length; i++) {
    sum += title.charCodeAt(i);
  }
  return colors[sum % colors.length];
};

const BookCard = ({ book, onEdit, onDelete }) => {
  const coverStyle = {
    background: getCoverGradientClass(book.title),
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: '0.375rem',
    borderTopRightRadius: '0.375rem',
    position: 'relative'
  };

  return (
    <div className="card h-100 shadow-sm border-0 book-card hover-lift transition-all">
      {/* Visual Book Cover */}
      <div style={coverStyle}>
        <span>{book.title.charAt(0).toUpperCase()}</span>
        <div className="position-absolute bottom-0 end-0 m-2">
          <span className="badge bg-dark bg-opacity-70 text-white rounded-pill px-2 py-1 fs-xs fw-normal">
            {book.year}
          </span>
        </div>
      </div>

      <div className="card-body d-flex flex-column p-4">
        {/* Genre badge */}
        <div className="mb-2">
          <span className={`badge border px-2.5 py-1.5 rounded ${getGenreBadgeClass(book.genre)}`}>
            {book.genre}
          </span>
        </div>

        {/* Title & Author */}
        <h5 className="card-title fw-bold text-dark text-truncate-2-lines mb-1" title={book.title}>
          {book.title}
        </h5>
        <p className="card-text text-muted mb-4 fs-6 d-flex align-items-center gap-1">
          <i className="bi bi-person text-primary"></i>
          <span className="text-truncate" title={book.author}>{book.author}</span>
        </p>

        {/* Actions pushed to bottom */}
        <div className="mt-auto pt-3 border-top border-light d-flex justify-content-between gap-2">
          <button
            className="btn btn-outline-primary btn-sm px-3 py-1.5 flex-grow-1 d-flex align-items-center justify-content-center gap-1.5"
            onClick={() => onEdit(book)}
          >
            <i className="bi bi-pencil-square"></i>
            <span>Edit</span>
          </button>
          <button
            className="btn btn-outline-danger btn-sm px-3 py-1.5 flex-grow-1 d-flex align-items-center justify-content-center gap-1.5"
            onClick={() => onDelete(book.id)}
          >
            <i className="bi bi-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
