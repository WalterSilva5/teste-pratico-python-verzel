import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <h3 className="navbar-brand px-3">
        <b>Teste Verzel</b>
      </h3>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNav"
      >
        <div className="container-fluid d-flex justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <button type="button" className="btn btn-dark nav-link" href="#">
                Modulos
              </button>
            </li>
          </ul>
        </div>
        <button type="button" className="btn btn-outline-info float-right mx-3">
          Entrar
        </button>
      </div>
    </nav>
  );
}

export default Header;
