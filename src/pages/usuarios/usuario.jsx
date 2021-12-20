/* eslint-disable import/named */
/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBusinessTime,
  faEdit,
  faUser,
  faIdCard,
  faEnvelope,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import { GET_USUARIO } from '../../graphql/usuarios/queries';

export default function PerfilUsuario(props) {
  const { _id } = props;
  const usuario = _id;
  const { data: queryData, loading: queryLoading } = useQuery(GET_USUARIO, {
    variables: { _id, usuario },
  });

  if (queryLoading) return <ReactLoading type='bubbles' color='blue' />;
  return (
    <div className='FormCon'>
      <Link to='/proyectos'>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='card'>
        <div
          className='btn buttonAdd'
          onClick={e => {
            e.preventDefault();

            window.location.href = `/usuarios/editar/${usuario}`;
          }}
        >
          <FontAwesomeIcon icon={faEdit} /> Editar
        </div>

        <div id='pattern' className='pattern'>
          <div className='c'>
            <div className='main'>
              <h1 className='titulo'> Perfil del Usuario </h1>
            </div>
            <hr />
            <div className='c2'>
              <h4 className='blue'>
                <span className='middle'>Datos personales</span>
              </h4>
              <div className='project-info'>
                <div className='project-info-row'>
                  <div className='project-info-name'>
                    <FontAwesomeIcon icon={faUser} />
                    Nombre:
                  </div>
                  <div className='project-info-value'>
                    <span>{queryData.Usuario.nombre}</span>
                  </div>
                </div>
                <div className='project-info-row'>
                  <div className='project-info-name'>
                    <FontAwesomeIcon icon={faIdCard} />
                    Identificacion:{' '}
                  </div>
                  <div className='project-info-value'>
                    <span>{queryData.Usuario.idUsuario}</span>
                  </div>
                </div>
                <div className='project-info-row'>
                  <div className='project-info-name'>
                    <FontAwesomeIcon icon={faEnvelope} />
                    Email:{' '}
                  </div>
                  <div className='project-info-value'>
                    <span>{queryData.Usuario.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='c3'>
              <h4 className='blue'>
                <span className='middle'>Información</span>
              </h4>
              <div className='project-info'>
                <div className='project-info-row'>
                  <div className='project-info-name'>
                    {' '}
                    <FontAwesomeIcon icon={faBusinessTime} />
                    Rol:{' '}
                  </div>
                  <div className='project-info-value'>
                    <span>{queryData.Usuario.rol}</span>
                  </div>
                </div>
                <div className='project-info-row'>
                  <div className='project-info-name'>
                    {' '}
                    <FontAwesomeIcon icon={faReceipt} />
                    estado:{' '}
                  </div>
                  <div className='project-info-value'>
                    <span>{queryData.Usuario.estado}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
