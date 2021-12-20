/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import { AVANCES } from '../../../graphql/proyectos/queries';
import PrivateComponent from '../../../components/PrivateComponent';

export default function Avances(props) {
  const imprimir = [];
  const idUsuario = props._id;
  const { data, error, loading } = useQuery(AVANCES, {
    variables: { idUsuario },
  });
  useEffect(() => {
    if (error) {
      toast.error('Error consultando los proyectos');
    }
  }, [error]);
  if (loading) return <ReactLoading type='bubbles' color='blue' />;

  data.ListarAvances.forEach(u => {
    if (u.avance.length > 0) {
      u.avance.forEach(x => {
        imprimir.push({
          _id: x._id,
          nombre: u.nombre,
          estadoP: u.estado,
          fecha: x.fecha,
          descripcion: x.descripcion,
          observacionesDelLider: x.observacionesDelLider,
        });
      });
    }
  });

  return (
    <PrivateComponent roleList={['Administrador', 'Lider']}>
      <div className='FormCon'>
        <h1 className='titulo'>Avances</h1>
        <div className='card'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Nombre del proyecto</th>
                <th>Fecha del avance</th>
                <th>Descripción</th>
                <th>Observaciones del Lider</th>
              </tr>
            </thead>
            <tbody>
              {data && data.ListarAvances ? (
                <>
                  {imprimir.map(x => (
                    <tr key={x._id}>
                      <td>
                        <div>
                          <div
                            className='title-th'
                            data-title='Nombre del proyecto: '
                          />
                          {x.nombre}
                        </div>
                      </td>
                      <td>
                        <div>
                          <div
                            className='title-th'
                            data-title='fecha del avance: '
                          />
                          {x.fecha}
                        </div>
                      </td>
                      <td>
                        <div>
                          <div
                            className='title-th'
                            data-title='Descripción: '
                          />
                          {x.descripcion}
                        </div>
                      </td>
                      <td>
                        <div>
                          <div
                            className='title-th'
                            data-title='Observaciones del Lider: '
                          />
                          {x && x.observacionesDelLider.length > 0 ? (
                            <>
                              {x.observacionesDelLider.map(i => (
                                <div key={i._id}>
                                  <li>{i}</li>
                                  {x.estadoP === 'Activo' ? (
                                    <Link
                                      to={`/proyectos/avances/observacion/${x._id}`}
                                    >
                                      <FontAwesomeIcon
                                        icon={faPen}
                                        color='yellow'
                                      />
                                    </Link>
                                  ) : (
                                    <div />
                                  )}
                                </div>
                              ))}
                              {x.estadoP === 'Activo' ? (
                                <Link
                                  to={`/proyectos/avances/nuevaObservacion/${x._id}`}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    color='green'
                                  />
                                </Link>
                              ) : (
                                <div />
                              )}
                            </>
                          ) : (
                            <div>
                              No hay Observaciones
                              {x.estadoP === 'Activo' ? (
                                <Link
                                  to={`/proyectos/avances/nuevaObservacion/${x._id}`}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    color='green'
                                  />
                                </Link>
                              ) : (
                                <div />
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div>No autorizado</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PrivateComponent>
  );
}
