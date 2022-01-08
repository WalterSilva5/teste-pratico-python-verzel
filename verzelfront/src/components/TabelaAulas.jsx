/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import axios from 'axios';
import ModalConfirmDelete from './ModalConfirmDelete';
import ModalCadastroDeAulas from './ModalCadastroDeAulas';

function TabelaDeAulas() {
  const [aulas, setAulas] = React.useState([]);
  const [modulos, setModulos] = React.useState([]);
  const [idAulaDelete, setIdAulaDelete] = React.useState(null);
  const [modalDeleteVisivel, setModalDeleteVisivel] = React.useState(false);
  const [confirmDel, setConfirmDel] = React.useState(false);
  const [aulaEditId, setAulaEditId] = React.useState(null);
  React.useEffect(() => {
    axios.get('http://localhost:8000/api/aula/').then((response) => {
      setAulas(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/modulo/').then((response) => {
      setModulos(response.data);
    });
  }, []);

  React.useEffect(() => {
    if (confirmDel === true && idAulaDelete !== null) {
      axios
        .delete(`http://localhost:8000/api/aula/${idAulaDelete}`)
        .then(() => {
          setAulas(aulas.filter((aula) => aula.id !== idAulaDelete));
          setIdAulaDelete(null);
          setConfirmDel(false);
          setModalDeleteVisivel(false);
        });
    }
  }, [confirmDel, idAulaDelete]);

  return (
    <div className="row rounded px-md-2">
      <div className="col-12 bg-dark rounded">
        <div className="row">
          <div className="col-12 mt-2">
            <h5 className="text-warning">
              <b>AULAS CADASTRADAS</b>
            </h5>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
          }}
        >
          <div className="col-12">
            <table className="table table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Modulo</th>
                  <th scope="col">Data</th>
                  <th scope="col">Opções</th>
                </tr>
              </thead>
              <tbody>
                {aulas.map((aula) => (
                  <tr key={aula.id}>
                    <th scope="row">{aula.id}</th>
                    <td>{aula.nome}</td>
                    <td>

                      {modulos.map((modulo) => (
                        modulo.id === aula.modulo ? (
                          <span key={modulo.id}>{modulo.nome}</span>
                        ) : (
                          <span key={modulo.id} />
                        )
                      ))}
                    </td>
                    <td>{aula.data.replaceAll('-', '/')}</td>
                    <td className="col-3">
                      <button
                        className="btn btn-outline-info"
                        onClick={() => {
                          setAulaEditId(aula.id);
                        }}
                      >
                        {' '}
                        editar
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setIdAulaDelete(aula.id);
                          setModalDeleteVisivel(true);
                        }}
                      >
                        {' '}
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalConfirmDelete
        modalVisivel={modalDeleteVisivel}
        setModalDeleteVisivel={setModalDeleteVisivel}
        confirmDel={confirmDel}
        setConfirmDel={setConfirmDel}
        idAulaDelete={idAulaDelete}
        setIdAulaDelete={setIdAulaDelete}
      />
      <ModalCadastroDeAulas
        modalCadastroVisivel={aulaEditId !== null}
        setModalCadastroVisivel={() => {
          setAulaEditId(null);
        }}
        aulaEditId={aulaEditId}
      />
    </div>
  );
}

export default TabelaDeAulas;
