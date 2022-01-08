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
import ModalCadastroDeModulos from './ModalCadastroDeModulos';

function TabelaDeModulos() {
  const [modulos, setModulos] = React.useState([]);
  const [idModuloDelete, setIdModuloDelete] = React.useState(null);
  const [modalDeleteVisivel, setModalDeleteVisivel] = React.useState(false);
  const [confirmDel, setConfirmDel] = React.useState(false);
  const [moduloEditId, setModuloEditId] = React.useState(null);
  React.useEffect(() => {
    axios.get('/api/modulo/').then((response) => {
      setModulos(response.data);
    });
  }, []);

  React.useEffect(() => {
    if (confirmDel === true && idModuloDelete !== null) {
      axios
        .delete(`/api/modulo/${idModuloDelete}`)
        .then(() => {
          setModulos(modulos.filter((modulo) => modulo.id !== idModuloDelete));
          setIdModuloDelete(null);
          setConfirmDel(false);
          setModalDeleteVisivel(false);
        });
    }
  }, [confirmDel, idModuloDelete]);

  return (
    <div className="row rounded px-md-2">
      <div className="col-12 bg-dark rounded">
        <div className="row">
          <div className="col-12 mt-2">
            <h5 className="text-warning">
              <b>MÓDULOS CADASTRADOS</b>
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col"> Opções</th>
                </tr>
              </thead>
              <tbody>
                {modulos.map((modulo) => (
                  <tr key={modulo.id}>
                    <th scope="row">{modulo.id}</th>
                    <td>{modulo.nome}</td>
                    <td className="col-3">
                      <button
                        className="btn btn-outline-info"
                        onClick={() => {
                          setModuloEditId(modulo.id);
                        }}
                      >
                        {' '}
                        editar
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setIdModuloDelete(modulo.id);
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
        idModuloDelete={idModuloDelete}
        setIdModuloDelete={setIdModuloDelete}
      />
      <ModalCadastroDeModulos
        modalCadastroVisivel={moduloEditId !== null}
        setModalCadastroVisivel={() => {
          setModuloEditId(null);
        }}
        moduloEditId={moduloEditId}
      />
    </div>
  );
}

export default TabelaDeModulos;
