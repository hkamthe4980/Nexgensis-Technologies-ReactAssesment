import React from 'react';

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  genres,
  onAddClick
}) => {
  return (
    <div className="card shadow-sm border-0 mb-4 bg-light">
      <div className="card-body p-3">
        <div className="row g-3 align-items-center">
          {/* Search bar */}
          <div className="col-12 col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="btn btn-outline-secondary border-start-0 border-start-0"
                  type="button"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>

          {/* Genre filter */}
          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select border-1"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="All">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selection */}
          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select border-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title-asc">Title (A - Z)</option>
              <option value="title-desc">Title (Z - A)</option>
              <option value="year-desc">Year (Newest First)</option>
              <option value="year-asc">Year (Oldest First)</option>
            </select>
          </div>

          {/* Spacer */}
          <div className="col-0 col-lg-2 d-none d-lg-block"></div>

          {/* Add Book Button */}
          <div className="col-12 col-md-2 col-lg-2 text-md-end">
            <button
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 hover-lift py-2 fw-semibold"
              onClick={onAddClick}
            >
              <i className="bi bi-plus-lg fs-5"></i>
              <span>Add Book</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
