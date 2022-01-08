/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';

function AlertDialog(props) {
  return (
    <div
      className={`alert alert-${props.alertType} container mt-5 text-center
                      d-block 
                      ${
                        props.showMensagemAlert
                          ? 'animate__animated animate__fadeIn'
                          : 'animate__animated animate__fadeOut d-none'
                      }
                  `}
      role="alert"
    >
      <p>{props.mensagemAlert}</p>
    </div>
  );
}

export default AlertDialog;

// implementacao

// import AlertDialog from '@/components/AlertDialog';
// const [mensagemAlert, setMensagemAlert] = React.useState('');
// const [alertType, setAlertType] = React.useState('danger');
// const [showMensagemAlert, setShowMensagemAlert] = React.useState(false);

// function setAlert(mensagem, tipo, show = true) {
//   setMensagemAlert(mensagem);
//   setAlertType(tipo);
//   setShowMensagemAlert(show);
// }

// <AlertDialog
// mensagemAlert={mensagemAlert}
// alertType={alertType}
// showMensagemAlert={showMensagemAlert}
// />