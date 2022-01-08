/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';
import TabelaDeAulas from './TabelaAulas';
import ModalCadastroDeAulas from '@/components/ModalCadastroDeAulas';
import classes from './TelaAulas.module.scss';
import add_icon from '@/assets/add_icon.png';

function TelaAulas() {
    const [
      modalModalCadastroDeAulasVisivel,
      setModalModalCadastroDeAulasVisivel,
    ] = React.useState(false);
    return (
      <div>
        <button
          className={`btn btn-lg col-md-5 btn-info ${classes.btn_shadow}`}
          onClick={() => {
            setModalModalCadastroDeAulasVisivel(true);
          }}
        >
          <div>
            <b>
              CADASTRAR AULA
  
            </b>
            {''}
            <span className={classes.btn_icon}>
              <img
                src={add_icon}
                alt="add_icon"
                className="img-fluid col-2 rounded-circle mx-2"
              />
  
            </span>
  
          </div>
        </button>
        <ModalCadastroDeAulas
          modalCadastroVisivel={modalModalCadastroDeAulasVisivel}
          setModalCadastroVisivel={setModalModalCadastroDeAulasVisivel}
        />
        <div className="mt-3">
          <TabelaDeAulas />
        </div>
      </div>
    );
  }
  
  export default TelaAulas;
  