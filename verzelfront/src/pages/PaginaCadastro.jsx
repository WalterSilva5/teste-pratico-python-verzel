/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import axios from 'axios';
import classes from './PaginaCadastro.module.scss';
import ModalCadastroDeModulos from '@/components/ModalCadastroDeModulos';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';

function PaginaCadastro() {
  const [modalModalCadastroDeModulosVisivel,
    setModalModalCadastroDeModulosVisivel] = React.useState(
    false,
  );

  return (
    <div>
      <div
        className="row rounded container-fluid m-0 p-0"
        style={{
          minHeight: '90vh',
        }}
      >
        <div className="col-md-2 col-12 bg-dark float-left py-3 ">
          <div className="px-1 row my-5" style={{ marginLeft: '5px' }}>
            <h5 className="text-warning"><b>CADASTROS</b></h5>
            <button className="btn btn-outline-info col-12 my-"><b>Módulos</b></button>
            <button className="btn btn-outline-info col-12 my-2"><b>Aulas</b></button>
          </div>
        </div>
        <div className="col-md-10 col-12 text-center mt-4">
          <button
            className={`btn btn-lg btn-info ${classes.btn_shadow}`}
            onClick={() => {
              setModalModalCadastroDeModulosVisivel(true);
            }}
          >
            <b>CADASTRAR MODULO</b>

          </button>
          <ModalCadastroDeModulos
            modalCadastroVisivel={modalModalCadastroDeModulosVisivel}
            setModalCadastroVisivel={setModalModalCadastroDeModulosVisivel}
          />
          <div className="mt-3">
            <TabelaDeModulos />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabelaDeModulos() {
  const [modulos, setModulos] = React.useState([]);
  const [idModuloDelete, setIdModuloDelete] = React.useState(null);
  const [modalDeleteVisivel, setModalDeleteVisivel] = React.useState(false);
  const [confirmDel, setConfirmDel] = React.useState(false);
  const [moduloEditId, setModuloEditId] = React.useState(null);
  React.useEffect(() => {
    axios.get('http://localhost:8000/api/modulo/')
      .then((response) => {
        setModulos(response.data);
      });
  }, []);

  React.useEffect(() => {
    if (confirmDel === true && idModuloDelete !== null) {
      axios.delete(`http://localhost:8000/api/modulo/${idModuloDelete}`)
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
            <h5 className="text-warning"><b>MÓDULOS CADASTRADOS</b></h5>
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
                        className="btn btn-outline-info"
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

export default PaginaCadastro;
