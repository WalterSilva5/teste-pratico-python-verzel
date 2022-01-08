/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import axios from 'axios';

function ModalCadastro(props) {
  const [modalCadastroVisivel, setModalCadastroVisivel] = React.useState(
    props.modalCadastroVisivel,
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const [mensagemAlert, setMensagemAlert] = React.useState('');
  const [alertType, setAlertType] = React.useState('danger');
  const [showMensagemAlert, setShowMensagemAlert] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function setAlert(mensagem, tipo, show = true) {
    setMensagemAlert(mensagem);
    setAlertType(tipo);
    setShowMensagemAlert(show);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/usuario/', {
        username,
        password,
      })
      .then(() => {
        setAlert('Usuário cadastrado com sucesso!', 'success', true);
        setModalCadastroVisivel(false);
      })
      .catch((error) => {
        try {
          if ('username' in error.response.data) {
            setAlert(`Usuario: ${error.response.data.username}`, 'danger', true);
          } else if ('password' in error.response.data) {
            setAlert(`Senha: ${error.response.data.password}`, 'danger', true);
          }
        } catch (e) {
          setAlert('Erro ao cadastrar usuário!', 'danger', true);
        }
      });
  }

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
              !props.modalCadastroVisivel
                ? 'animate__fadeOutRight'
                : 'animate__bounceIn'
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
                  <b>CADASTRO</b>
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
                <label htmlFor="nome">Usuario</label>
                <input
                  type="text"
                  id="nome"
                  className="form-control"
                  placeholder="Usuario"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="senha">Senha</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  className="form-control"
                  placeholder="Senha"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                  onClick={handleSubmit}
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
                <div
                  className={`alert alert-${alertType} container mt-5 text-center
                    d-block 
                    ${
                      showMensagemAlert
                        ? 'animate__animated animate__fadeIn'
                        : 'animate__animated animate__fadeOut d-none'
                    }
                `}
                  role="alert"
                >
                  <p>{mensagemAlert}</p>
                </div>
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
          <div />
        </div>
      </div>
    );
  }
  return <div />;
}

export default ModalCadastro;
