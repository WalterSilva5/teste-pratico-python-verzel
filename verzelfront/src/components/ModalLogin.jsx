/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import AlertDialog from './AlertDialog';

function ModalLogin(props) {
  const [modalLoginVisivel, setModalLoginVisivel] = React.useState(
    props.modalLoginVisivel,
  );
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mensagemAlert, setMensagemAlert] = React.useState('');
  const [alertType, setAlertType] = React.useState('danger');
  const [showMensagemAlert, setShowMensagemAlert] = React.useState(false);

  function setAlert(mensagem, tipo, show = true) {
    setMensagemAlert(mensagem);
    setAlertType(tipo);
    setShowMensagemAlert(show);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('/api/login/', {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem('authToken', response.data.access);
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
        window.location.href = '/cadastros';
      })
      .catch((error) => {
        console.log(error.response);
        try {
          if ('username' in error.response.data) {
            setAlert(
              `Usuario: ${error.response.data.username}`,
              'danger',
              true,
            );
          } else if ('password' in error.response.data) {
            setAlert(`Senha: ${error.response.data.password}`, 'danger', true);
          } else if ('detail' in error.response.data) {
            setAlert(`${error.response.data.detail}`, 'danger', true);
          }
        } catch (e) {
          setAlert(error.response.statusText, 'danger', true);
        }
      });
  }

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
              !props.modalLoginVisivel
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
                  <b>LOGIN</b>
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
                <label htmlFor="usuario">Usuário</label>
                <input
                  type="text"
                  id="usuario"
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
                    props.setModalLoginVisivel(false);
                  }}
                >
                  CANCELAR
                </button>
                <AlertDialog
                  mensagemAlert={mensagemAlert}
                  alertType={alertType}
                  showMensagemAlert={showMensagemAlert}
                />
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

export default ModalLogin;
