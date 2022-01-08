/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */

import React from 'react';
import axios from 'axios';
import AlertDialog from '@/components/AlertDialog';

function ModalCadastroDeModulos(props) {
  const [nomeModulo, setNomeModulo] = React.useState('');
  const [
    modalModalCadastroDeModulosVisivel,
    setModalModalCadastroDeModulosVisivel,
  ] = React.useState(false);
  const [mensagemAlert, setMensagemAlert] = React.useState('');
  const [alertType, setAlertType] = React.useState('danger');
  const [showMensagemAlert, setShowMensagemAlert] = React.useState(false);
  const editando = false;
  const authToken = localStorage.getItem('authToken');
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  function setAlert(mensagem, tipo, show = true) {
    setMensagemAlert(mensagem);
    setAlertType(tipo);
    setShowMensagemAlert(show);
  }

  React.useEffect(() => {
    if (props.moduloEditId !== null && props.moduloEditId !== undefined) {
      axios
        .get(`/api/modulo/${props.moduloEditId}/`)
        .then((res) => {
          setNomeModulo(res.data.nome);
        })
        .catch((err) => {
          setAlert(
            'Erro ao carregar dados do módulo, tente novamente mais tarde',
            'danger',
            true,
          );
        });
    }
  }, [props.moduloEditId]);

  function handleSubmit(event) {
    event.preventDefault();

    let requestMethod = '';
    let requestUrl = '/api/';

    if (props.moduloEditId !== null && props.moduloEditId !== undefined) {
      requestMethod = 'put';
      requestUrl += `modulo/${props.moduloEditId}/`;
    } else {
      requestMethod = 'post';
      requestUrl += 'modulo_create/';
    }

    axios({
      method: requestMethod,
      url: requestUrl,
      data: {
        nome: nomeModulo,
      },
    })
      .then((response) => {
        setAlert(
          `Módulo '${response.data.nome}'
          ${requestMethod === 'post' ? 'cadastrado' : 'atualizado'} com sucesso`,
          'success',
          true,
        );
        setNomeModulo('');
      })
      .catch((error) => {
        let mensagem = '';
        if ('detail' in error.response.data) {
          mensagem = error.response.data.detail;
        } else if ('nome' in error.response.data) {
          mensagem = `Nome: ${error.response.data.nome}`;
        } else {
          mensagem = 'Erro ao cadastrar módulo!';
        }
        setAlert(mensagem, 'danger', true);
      });
  }

  return (
    <div
      className={` modal animate__animated
          ${
            props.modalCadastroVisivel
              ? 'animate__bounceIn d-block'
              : 'd-none nimate__bounceOut'
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
                  {props.moduloEditId !== null
                  && props.moduloEditId !== undefined
                    ? 'EDIÇÃO '
                    : 'CADASTRO '}
                  DE MODULO
                </b>
              </h3>
              <br />

              <button
                className="btn btn btn-danger btn-sm"
                type="button"
                onClick={() => {
                  props.setModalCadastroVisivel(false);
                  setAlert('', 'danger', false);
                  setNomeModulo('');
                  window.location.reload();
                }}
              >
                FECHAR
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="container col-md-11">
                  <div className="d-flex justify-content-start">
                    <label htmlFor="nome">Nome</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    autoComplete="off"
                    placeholder="Nome do módulo"
                    value={nomeModulo}
                    onChange={(e) => {
                      setNomeModulo(e.target.value);
                    }}
                  />
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Salvar
                    </button>
                  </div>
                  <AlertDialog
                    mensagemAlert={mensagemAlert}
                    alertType={alertType}
                    showMensagemAlert={showMensagemAlert}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCadastroDeModulos;
