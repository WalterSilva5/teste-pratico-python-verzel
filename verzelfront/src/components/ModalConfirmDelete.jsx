/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React from 'react';

function ModalConfirmDelete(props) {
  if (props.modalVisivel) {
    return (
      <div
        className={` modal animate__animated d-block
            ${
              !props.modalDeleteVisivel ? 'animate__fadeIn' : 'animate__fadeOut'
            }`}
      >
        <div>
          <div
            className="modal-dialog modal-lg"
            role="document"
            style={{ width: '100%' }}
          >
            <div className="modal-content  border-primary shadow-primary blur">
              <div className="modal-header">
                <h5 className="modal-title text-center">
                  <b> CONFIRMA EXCLUSÃO?</b>
                </h5>
                <button
                  className="btn btn btn-danger btn-sm"
                  type="button"
                  onClick={() => {
                    props.setModalDeleteVisivel(false);
                  }}
                >
                  FECHAR
                </button>
              </div>
              <div className="modal-body d-flex justify-content-between">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    props.setConfirmDel(true);
                  }}
                >
                  CONFIRMAR
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    props.setModalDeleteVisivel(false);
                  }}
                >
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}

export default ModalConfirmDelete;
