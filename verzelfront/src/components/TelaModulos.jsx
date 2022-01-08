/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import ModalCadastroDeModulos from '@/components/ModalCadastroDeModulos';
import TabelaDeModulos from './TabelaModulos';
import classes from './TelaModulos.module.scss';

function TelaModulos() {
  const [
    modalModalCadastroDeModulosVisivel,
    setModalModalCadastroDeModulosVisivel,
  ] = React.useState(false);
  return (
    <div>
      <button
        className={`btn btn-lg col-md-5 btn-info ${classes.btn_shadow}`}
        onClick={() => {
          setModalModalCadastroDeModulosVisivel(true);
        }}
      >
        <div>
          <b>
            CADASTRAR MÓDULO

          </b>
          {' '}
          <span className={classes.btn_icon} />

        </div>
      </button>
      <ModalCadastroDeModulos
        modalCadastroVisivel={modalModalCadastroDeModulosVisivel}
        setModalCadastroVisivel={setModalModalCadastroDeModulosVisivel}
      />
      <div className="mt-3">
        <TabelaDeModulos />
      </div>
    </div>
  );
}

export default TelaModulos;
