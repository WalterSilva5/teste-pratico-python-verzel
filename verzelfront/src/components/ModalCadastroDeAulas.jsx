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

function ModalCadastroDeAulas(props) {
  const [nomeAula, setNomeAula] = React.useState('');
  const [dataAula, setDataAula] = React.useState('');
  const [videoUrl, setVideoUrl] = React.useState('');
  const [moduloId, setModuloId] = React.useState('');
  const [modulos, setModulos] = React.useState([]);
  const [
    modalModalCadastroDeAulasVisivel,
    setModalModalCadastroDeAulasVisivel,
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
    axios.get('http://localhost:8000/api/modulo/').then((response) => {
      setModulos(response.data);
    });
  }, []);

  React.useEffect(() => {
    if (props.aulaEditId !== null && props.aulaEditId !== undefined) {
      axios
        .get(`http://localhost:8000/api/aula/${props.aulaEditId}/`)
        .then((res) => {
          setNomeAula(res.data.nome);
          setDataAula(res.data.data);
          setVideoUrl(res.data.video_url);
          setModuloId(res.data.modulo);
        })
        .catch((err) => {
          setAlert(
            'Erro ao carregar dadas da aula, tente novamente mais tarde',
            'danger',
            true,
          );
        });
    }
  }, [props.aulaEditId]);

  function handleSubmit(event) {
    event.preventDefault();

    let requestMethod = '';
    let requestUrl = 'http://localhost:8000/api/';

    if (props.aulaEditId !== null && props.aulaEditId !== undefined) {
      requestMethod = 'put';
      requestUrl += `aula/${props.aulaEditId}/`;
    } else {
      requestMethod = 'post';
      requestUrl += 'aula/';
    }

    axios({
      method: requestMethod,
      url: requestUrl,
      data: {
        nome: nomeAula,
        data: dataAula,
        video_url: videoUrl,
        modulo: moduloId,
      },
    })
      .then((response) => {
        setAlert(
          `aula '${response.data.nome}'
          ${requestMethod === 'post' ? 'cadastrada' : 'atualizada'} com sucesso`,
          'success',
          true,
        );
        setNomeAula('');
        setDataAula('');
        setVideoUrl('');
        setModuloId('');
      })
      .catch((error) => {
        let mensagem = '';
        if ('detail' in error.response.data) {
          mensagem = error.response.data.detail;
        } else if ('nome' in error.response.data) {
          mensagem = `Nome: ${error.response.data.nome}`;
        } else if ('data' in error.response.data) {
          mensagem = `Data: ${error.response.data.data}`;
        } else if ('video_url' in error.response.data) {
          mensagem = `Video Url: ${error.response.data.video_url}`;
        } else if ('modulo' in error.response.data) {
          mensagem = `Modulo: ${error.response.data.modulo}`;
        } else {
          mensagem = 'Erro ao cadastrar aula!';
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
                  {props.aulaEditId !== null
                  && props.aulaEditId !== undefined
                    ? 'EDIÇÃO '
                    : 'CADASTRO '}
                  DE AULA
                </b>
              </h3>
              <br />

              <button
                className="btn btn btn-danger btn-sm"
                type="button"
                onClick={() => {
                  props.setModalCadastroVisivel(false);
                  setAlert('', 'danger', false);
                  setNomeAula('');
                  window.location.reload();
                }}
              >
                FECHAR
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="container col-md-11">
                  <div>
                    {/* forumlario de aula */}
                    <div className="d-flex justify-content-start">
                      <label htmlFor="nome">Nome</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      autoComplete="off"
                      placeholder="Nome da aula"
                      value={nomeAula}
                      onChange={(e) => {
                        setNomeAula(e.target.value);
                      }}
                    />
                    <div className="d-flex justify-content-start">
                      <label htmlFor="data">Data</label>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      id="data"
                      autoComplete="off"
                      placeholder="Data da aula"
                      value={dataAula}
                      onChange={(e) => {
                        setDataAula(e.target.value);
                      }}
                    />
                    <div className="d-flex justify-content-start">
                      <label htmlFor="videoUrl">Video Url</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="videoUrl"
                      autoComplete="off"
                      placeholder="Url do video"
                      value={videoUrl}
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                      }}
                    />
                    <div className="d-flex justify-content-start">
                      <label htmlFor="moduloId">Modulo</label>
                    </div>
                    <select
                      className="form-control"
                      id="moduloId"
                      autoComplete="off"
                      value={moduloId}
                      onChange={(e) => {
                        setModuloId(e.target.value);
                      }}
                    >
                      <option value="">Selecione um modulo</option>
                      {modulos.map((modulo) => (
                        <option key={modulo.id} value={modulo.id}>
                          {modulo.nome}
                        </option>
                      ))}
                    </select>
                  </div>
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

export default ModalCadastroDeAulas;
