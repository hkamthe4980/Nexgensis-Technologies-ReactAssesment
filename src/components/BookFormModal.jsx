import React, { useState, useEffect } from 'react';

const BookFormModal = ({ isOpen, onClose, onSave, book }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: ''
  });

  const [errors, setErrors] = useState({});

  // Reset or populate the form when the modal opens or the active book changes
  useEffect(() => {
    if (isOpen) {
      if (book) {
        setFormData({
          title: book.title || '',
          author: book.author || '',
          genre: book.genre || '',
          year: book.year || ''
        });
      } else {
        setFormData({
          title: '',
          author: '',
          genre: '',
          year: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, book]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    
    if (!formData.year) {
      newErrors.year = 'Publication year is required';
    } else {
      const yearNum = parseInt(formData.year, 10);
      if (isNaN(yearNum) || yearNum < 0 || yearNum > currentYear) {
        newErrors.year = `Enter a valid year between 0 and ${currentYear}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <>
      {/* Bootstrap modal structure driven by React state */}
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg">
            
            {/* Modal Header */}
            <div className="modal-header bg-dark text-white border-bottom border-secondary py-3">
              <h5 className="modal-title fw-bold">
                <i className={`bi ${book ? 'bi-pencil-square text-warning' : 'bi-plus-circle text-primary'} me-2`}></i>
                {book ? 'Edit Book Details' : 'Add New Book'}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                
                {/* Book Title */}
                <div className="mb-3">
                  <label htmlFor="book-title" className="form-label fw-semibold text-muted">
                    Book Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="book-title"
                    name="title"
                    placeholder="e.g. The Hobbit"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                {/* Author Name */}
                <div className="mb-3">
                  <label htmlFor="book-author" className="form-label fw-semibold text-muted">
                    Author <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                    id="book-author"
                    name="author"
                    placeholder="e.g. J.R.R. Tolkien"
                    value={formData.author}
                    onChange={handleChange}
                  />
                  {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                </div>

                {/* Genre & Year Row */}
                <div className="row g-3">
                  
                  {/* Genre */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="book-genre" className="form-label fw-semibold text-muted">
                      Genre <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                      id="book-genre"
                      name="genre"
                      placeholder="e.g. Fantasy"
                      value={formData.genre}
                      onChange={handleChange}
                    />
                    {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
                  </div>

                  {/* Publication Year */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="book-year" className="form-label fw-semibold text-muted">
                      Publication Year <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                      id="book-year"
                      name="year"
                      placeholder="e.g. 1937"
                      value={formData.year}
                      onChange={handleChange}
                    />
                    {errors.year && <div className="invalid-feedback">{errors.year}</div>}
                  </div>

                </div>

              </div>

              {/* Modal Footer */}
              <div className="modal-footer bg-light border-top border-light-subtle py-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn ${book ? 'btn-warning text-dark' : 'btn-primary'} px-4 fw-semibold`}
                >
                  {book ? 'Update Book' : 'Save Book'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
      {/* Background overlay */}
      <div className="modal-backdrop show" onClick={onClose} style={{ zIndex: 1040 }}></div>
    </>
  );
};

export default BookFormModal;
