/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import classes from './ModuloCard.module.scss';

function ModuloCard(props) {
  const { nome } = props.modulo;
  const quantidadeAulas = props.modulo.aulas.length;
  return (
    <div
      className={`col-10 col-md-4 col-xl-3 my-2 ${classes.modulo_card}`}
      onClick={() => props.setModulo(props.modulo)}
    >
      <div className="mb-4 m-3 text-light">
        <h4>
          <b>{nome}</b>
        </h4>
        <p>
          {quantidadeAulas}
          {' '}
          Aulas
        </p>
      </div>
    </div>
  );
}

export default ModuloCard;
