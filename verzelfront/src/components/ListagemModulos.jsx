/* eslint-disable react/jsx-no-bind */
/* eslint-disable quotes */
import React from "react";
import axios from "axios";
import ModuloCard from "./ModuloCard";
import classes from './AulaCard.module.scss';

function ListagemModulos() {
  const [modulos, setModulos] = React.useState([]);
  const [moduloEscolhido, setModuloEscolhido] = React.useState(null);
  const [modulosVazio, setModulosVazio] = React.useState(false);
  function buscarModulos() {
    axios.get("/api/modulo/").then((response) => {
      setModulos(response.data);
      if (response.data.length === 0) {
        setModulosVazio(true);
      } else {
        setModuloEscolhido(response.data[0]);
      }
    });
  }
  if (modulos.length === 0 && !modulosVazio) {
    buscarModulos();
  }

  function setModulo(modulo) {
    setModuloEscolhido(modulo);
  }

  function formatData(data) {
    const novaData = new Date(data);
    return `${novaData.getDate()}/${novaData.getMonth() + 1}/${novaData.getFullYear()}`;
  }

  return (
    <div>
      {/* pagina modulos */}
      <div className="container-fluid m-md-5">
        <h1>
          <b>Módulos</b>
        </h1>
        <h4>Selecione o módulo para ver as aulas disponiveis</h4>
      </div>
      <div className="mt-5">
        {/* modulos */}
        <div className="container-fluid row mx-md-5 mx-1 d-flex justify-content-center">
          {modulos.map((modulo) => (
            <ModuloCard key={modulo.id} modulo={modulo} setModulo={setModulo} />
          ))}
        </div>
      </div>
      {
        // modulo escolhido
        moduloEscolhido && (
          <div className="container-fluid m-md-5">
            <div className="row">
              <div className="col-md-12 mt-3">
                <h1>
                  <b>{moduloEscolhido.nome}</b>
                </h1>
                <h4>Todas as aulas disponiveis nesse módulo:</h4>
              </div>
            </div>
          </div>
        )
      }

      {/* aulas */}
      {moduloEscolhido && (
        <div className="p-2 justify-content-between">
          <div className="container-fluid">
            <div className="row  m-2 p-2">
              {moduloEscolhido.aulas.map((aula) => (
                <div className={`col-10  m-2 col-md-5 col-xl-3 ${classes.card_aula}`} key={aula.id}>
                  <div className="card ">
                    <div className="card-body">
                      <h4 className="card-title"><b>{aula.nome}</b></h4>
                      <h5>{formatData(aula.data).replaceAll('-', '/')}</h5>
                      <a href={aula.video_url} target="__blank" className="btn btn-primary">
                        Acessar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ListagemModulos;
