import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text, onClick = () => {} }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type='submit'
    className='centroPadre btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm botonCarga'
  >
    {loading ? (
      <ReactLoading className='centroHijo' type='spin' height={20} width={20} />
    ) : (
      text
    )}
  </button>
);

export default ButtonLoading;
