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

  return (
    <nav className="navbar navbar-expand bg-dark text-white container-fluid">
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
            <li>
              <NavLink
                to="/"
                exact="true"
                className="btn btn-outline-warning mx-2"
              >
                Módulos
              </NavLink>
            </li>
            <li>
              {
                authToken !== null
                  ? (
                    <NavLink
                      exact="true"
                      to="/cadastros"
                      className="btn btn-outline-warning mx-2"
                    >
                      Cadastros
                    </NavLink>
                  )
                  : null
              }
            </li>
          </ul>
        </div>
        {
          authToken === null
            ? (
              <button
                type="button"
                className="btn btn-outline-info float-right mx-3"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => setModalVisivel(true)}
              >
                Entrar
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-danger float-right mx-3"
                onClick={() => {
                  localStorage.removeItem('authToken');
                  window.location.href = '/';
                }}
              >
                sair

              </button>
            )
        }
      </div>

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

    </nav>
  );
}

export default Header;
