/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function Header() {
  const [modalVisivel, setModalVisivel] = React.useState(false);
  const [modalCadastroShow, setModalCadastroVisivel] = React.useState(false);
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
        <button
          type="button"
          className="btn btn-outline-info float-right mx-3"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => setModalVisivel(true)}
        >
          Entrar
        </button>
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

function ModalLogin(props) {
  const [modalLoginVisivel, setModalLoginVisivel] = React.useState(props.modalLoginVisivel);
  const [showPassword, setShowPassword] = React.useState(false);
  React.useEffect(() => {
    if (props.modalLoginVisivel) {
      setModalLoginVisivel(true);
    } else {
      setModalLoginVisivel(false);
    }
  }, [props.modalLoginVisivel]);

  if (modalLoginVisivel) {
    return (

      <div
        className={` modal animate__animated d-block
          ${
            !props.modalLoginVisivel ? 'animate__fadeOutRight' : 'animate__bounceIn'
          }`}
      >
        <div>
          <div
            className="modal-dialog modal-lg"
            role="document"
            style={{ width: '100%' }}
          >
            <div className="modal-content blur">
              <div className="modal-header">
                <h3 className="modal-title text-center">
                  <b>
                    LOGIN
                  </b>
                </h3>
                <br />

                <button
                  className="btn btn btn-danger btn-sm"
                  type="button"
                  onClick={() => {
                    props.setModalLoginVisivel(false);
                  }}
                >
                  FECHAR
                </button>
              </div>
              <div className="modal-body">

                <label htmlFor="usuario">
                  Usuário
                </label>
                <input
                  type="text"
                  id="usuario"
                  className="form-control"
                  placeholder="Usuario"
                  autoComplete="off"
                />
                <br />
                <label htmlFor="senha">
                  Senha
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  className="form-control"
                  placeholder="Senha"
                  autoComplete="off"
                />
                {/* button show password */}
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? 'Esconder senha' : 'Mostrar senha'}
                </button>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success"
                >
                  CONFIRMAR

                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    props.setModalLoginVisivel(false);
                  }}
                >
                  CANCELAR
                </button>
                <div className="container mt-5">
                  <p className="text-center">
                    Ainda não cadastrado?
                    {' '}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark bg-warning"
                      onClick={() => {
                        props.setModalCadastroVisivel(true);
                        props.setModalLoginVisivel(false);
                      }}
                    >
                      Cadastre-se

                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}

// cadastro

function ModalCadastro(props) {
  const [modalCadastroVisivel, setModalCadastroVisivel] = React.useState(props.modalCadastroVisivel);
  const [showPassword, setShowPassword] = React.useState(false);
  React.useEffect(() => {
    if (props.modalCadastroVisivel) {
      setModalCadastroVisivel(true);
    } else {
      setModalCadastroVisivel(false);
    }
  }, [props.modalCadastroVisivel]);

  if (modalCadastroVisivel) {
    return (

      <div
        className={` modal animate__animated d-block
          ${
            !props.modalCadastroVisivel ? 'animate__fadeOutRight' : 'animate__bounceIn'
          }`}
      >
        <div>
          <div
            className="modal-dialog modal-lg"
            role="document"
            style={{ width: '100%' }}
          >
            <div className="modal-content blur">
              <div className="modal-header">
                <h3 className="modal-title text-center">
                  <b>
                    CADASTRO
                  </b>
                </h3>
                <br />

                <button
                  className="btn btn btn-danger btn-sm"
                  type="button"
                  onClick={() => {
                    props.setModalCadastroVisivel(false);
                  }}
                >
                  FECHAR
                </button>
              </div>
              <div className="modal-body">

                <label htmlFor="nome">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  className="form-control"
                  placeholder="Nome"
                  autoComplete="off"
                />
                <br />
                <label htmlFor="senha">
                  Senha
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  className="form-control"
                  placeholder="Senha"
                  autoComplete="off"
                />
                {/* button show password */}
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? 'Esconder senha' : 'Mostrar senha'}
                </button>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success"
                >
                  CONFIRMAR

                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    props.setModalCadastroVisivel(false);
                  }}
                >
                  CANCELAR
                </button>
                <div className="container mt-5">
                  <p className="text-center">
                    Já possui cadastro?
                    {' '}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark bg-warning"
                      onClick={() => {
                        props.setModalLoginVisivel(true);
                        props.setModalCadastroVisivel(false);
                      }}
                    >
                      Fazer Login

                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}

export default Header;
