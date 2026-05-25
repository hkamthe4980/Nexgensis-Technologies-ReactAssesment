import React from 'react';

const Navbar = ({ isOffline }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm border-bottom border-secondary mb-4 py-3">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#/">
          <i className="bi bi-book-half fs-3 text-warning"></i>
          <span className="fw-bold tracking-tight">NexBook <span className="text-warning">Manager</span></span>
        </a>
        <div className="ms-auto d-flex align-items-center">
          {isOffline ? (
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill d-flex align-items-center gap-2 border border-warning shadow-sm">
              <i className="bi bi-cloud-slash-fill spinner-grow-sm text-dark"></i>
              <span>Offline Database (LocalStorage)</span>
            </span>
          ) : (
            <span className="badge bg-success px-3 py-2 rounded-pill d-flex align-items-center gap-2 border border-success shadow-sm">
              <i className="bi bi-cloud-check-fill text-white animate-pulse"></i>
              <span>JSON REST API Online</span>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
