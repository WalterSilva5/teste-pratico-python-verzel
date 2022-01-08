/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import TelaModulos from '@/components/TelaModulos';
import TelaAulas from '@/components/TelaAulas';

function PaginaCadastro() {
  const [telaAtivaAtual, setTelaAtivaAtual] = React.useState(0);
  return (
    <div>
      <div
        className="row rounded container-fluid m-0 p-0"
        style={{
          minHeight: '90vh',
        }}
      >
        <div className="col-md-2 col-12 bg-dark float-left py-3 ">
          <div className="nav flex-column">
            <h5 className="text-warning"><b>CADASTROS</b></h5>
            <button
              className={`btn btn-outline-info col-12 my-2 ${telaAtivaAtual === 0 ? 'active' : ''}`}
              onClick={() => {
                setTelaAtivaAtual(0);
              }}
            >
              <b>Módulos</b>

            </button>
            <button
              className={`btn btn-outline-info col-12 my-2 ${telaAtivaAtual === 1 ? 'active' : ''}`}
              onClick={() => {
                setTelaAtivaAtual(1);
              }}
            >
              <b>Aulas</b>

            </button>
          </div>
        </div>
        <div className="col-md-10 col-12 text-center mt-4">
          {telaAtivaAtual === 0 ? <TelaModulos /> : <TelaAulas />}
        </div>
      </div>
    </div>
  );
}

export default PaginaCadastro;
