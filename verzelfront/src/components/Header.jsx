/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { NavLink } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import ModalCadastro from './ModalCadastro';

function Header() {
  const [modalVisivel, setModalVisivel] = React.useState(false);
  const [modalCadastroShow, setModalCadastroVisivel] = React.useState(false);
  const authToken = localStorage.getItem('authToken');
  const [showMenuMobile, setShowMenuMobile] = React.useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-black bg-black text-white">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            {' '}
            <b>Verzel Teste Prático</b>
            {' '}
          </span>
          <button
            className="btn btn-white bg-warning text-black d-block d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar_header"
            aria-controls="navbar_header"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowMenuMobile(!showMenuMobile)}
          >
            <span className="navbar-toggler-icon">|||</span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              showMenuMobile ? 'show' : ''
            }`}
            id="navbar_header"
          >
            <div
              className="navbar-nav"
            >
              <NavLink
                to="/"
                exact="true"
                className="btn btn-outline-warning mx-2 my-2 my-md-0"
              >
                Módulos
              </NavLink>
              {authToken !== null ? (
                <NavLink
                  exact="true"
                  to="/cadastros"
                  className="btn btn-outline-warning mx-2 my-2 my-md-0"
                >
                  Cadastros
                </NavLink>
              ) : null}
              {authToken === null ? (
                <button
                  type="button"
                  className="btn btn-outline-info float-right mx-2 my-2 my-md-0"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => setModalVisivel(true)}
                >
                  Entrar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-danger float-right mx-2 my-2 my-md-0"
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    window.location.href = '/';
                  }}
                >
                  sair
                </button>
              )}

            </div>
          </div>
        </div>
      </nav>
      <ModalLogin
        modalLoginVisivel={modalVisivel}
        setModalLoginVisivel={setModalVisivel}
        setModalCadastroVisivel={setModalCadastroVisivel}
      />
      <ModalCadastro
        modalCadastroVisivel={modalCadastroShow}
        setModalCadastroVisivel={setModalCadastroVisivel}
        setModalLoginVisivel={setModalVisivel}
      />
    </div>
  );
}

export default Header;
