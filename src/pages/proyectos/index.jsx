/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faEdit,
  faWindowClose,
  faPowerOff,
  faThumbsUp,
  faEye,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { GET_PROYECTOS } from '../../graphql/proyectos/queries';
import { Enum_FaseProyecto, Enum_EstadoProyecto } from '../../utils/enums';
// eslint-disable-next-line import/no-named-as-default-member
import PrivateComponent from '../../components/PrivateComponent';

export default function IndexProyectos(props) {
  const idUsuario = props._id;
  const { nombre } = props;
  const { data, error, loading } = useQuery(GET_PROYECTOS, {
    variables: { idUsuario },
  });
  useEffect(() => {
    if (error) {
      toast.error('Error consultando los proyectos');
    }
  }, [error]);
  if (loading) return <ReactLoading type='bubbles' color='blue' />;
  return (
    <>
      <PrivateComponent roleList={['Administrador']}>
        <div className='FormCon'>
          <h1 className='titulo'> Proyectos</h1>

          <div className='card'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Lider</th>
                  <th>Fase</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data && data.ListarProyectos ? (
                  <>
                    {data.ListarProyectos.map(u => {
                      return (
                        <tr key={u._id}>
                          <td>
                            <div>
                              <div className='title-th' data-title='Nombre: ' />
                              {u.nombre}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Lider: ' />
                              {u.lider.nombre}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Fase: ' />
                              {Enum_FaseProyecto[u.fase]}
                            </div>
                          </td>

                          <td>
                            <div>
                              <div className='title-th' data-title='Estado: ' />
                              {Enum_EstadoProyecto[u.estado]}

                              {u.estado === 'Inactivo' && u.fase === null ? (
                                <Link
                                  to={`/proyectos/aprobar/${u._id}`}
                                  alt='Aprobar proyecto'
                                >
                                  <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    color='green'
                                  />
                                </Link>
                              ) : (
                                <div />
                              )}
                              {u.estado === 'Activo' &&
                              (u.fase === 'Iniciado' ||
                                u.fase === 'En_Desarrollo') ? (
                                <Link
                                  to={`/proyectos/inactivar/${u._id}`}
                                  alt='Inactivar proyecto'
                                >
                                  <FontAwesomeIcon
                                    icon={faPowerOff}
                                    color='red'
                                  />
                                </Link>
                              ) : (
                                <div />
                              )}
                              {u.estado === 'Activo' &&
                              u.fase === 'En_Desarrollo' ? (
                                <Link
                                  to={`/proyectos/terminar/${u._id}`}
                                  alt='Terminar proyecto'
                                >
                                  <FontAwesomeIcon
                                    icon={faWindowClose}
                                    color='red'
                                  />
                                </Link>
                              ) : (
                                <div />
                              )}
                              {u.estado === 'Inactivo' &&
                              u.fase !== 'Terminado' &&
                              u.fase !== null ? (
                                <Link
                                  to={`/proyectos/reabrir/${u._id}`}
                                  alt='Reabrir proyecto'
                                >
                                  <FontAwesomeIcon
                                    icon={faPowerOff}
                                    color='green'
                                  />
                                </Link>
                              ) : (
                                <div />
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div
                                className='title-th'
                                data-title='Acciones: '
                              />
                              <Link to={`/proyectos/editar/${u._id}`}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                              <Link to={`/proyecto/${u._id}`}>
                                <FontAwesomeIcon icon={faEye} />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <div>No autorizado</div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PrivateComponent>
      <PrivateComponent roleList={['Lider']}>
        <div className='FormCon'>
          <h1 className='titulo'> Proyectos Liderados Por: {nombre}</h1>
          <div className='card'>
            {data && data.ListarProyectos ? (
              <div
                className='btn buttonAdd'
                onClick={e => {
                  e.preventDefault();

                  window.location.href = `/proyectos/crear/${idUsuario}`;
                }}
              >
                {' '}
                <FontAwesomeIcon icon={faPlusCircle} color='white' />
                Crear Proyecto
              </div>
            ) : (
              <div />
            )}

            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Presupuesto</th>
                  <th>Fase</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data && data.ListarProyectos ? (
                  <>
                    {data.ListarProyectos.map(u => {
                      return (
                        <tr key={u._id}>
                          <td>
                            <div>
                              <div className='title-th' data-title='Nombre: ' />
                              {u.nombre}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div
                                className='title-th'
                                data-title='Presupuesto: '
                              />
                              {u.presupuesto}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Fase: ' />
                              {Enum_FaseProyecto[u.fase]}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Estado: ' />
                              {Enum_EstadoProyecto[u.estado]}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div
                                className='title-th'
                                data-title='Acciones: '
                              />
                              {u.estado === 'Activo' ? (
                                <Link to={`/proyectos/editar/${u._id}`}>
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    color='yellow'
                                  />
                                </Link>
                              ) : (
                                <div />
                              )}

                              <Link to={`/proyecto/${u._id}`}>
                                <FontAwesomeIcon icon={faEye} />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <div>No autorizado</div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PrivateComponent>
      <PrivateComponent roleList={['Estudiante']}>
        <div className='FormCon'>
          <h1 className='titulo'> Proyectos</h1>

          <div className='card'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Lider</th>
                  <th>Fase</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data && data.ListarProyectos ? (
                  <>
                    {data.ListarProyectos.map(u => {
                      return (
                        <tr key={u._id}>
                          <td>
                            <div>
                              <div className='title-th' data-title='Nombre: ' />
                              {u.nombre}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Lider: ' />
                              {u.lider.nombre}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Fase: ' />
                              {Enum_FaseProyecto[u.fase]}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Estado: ' />
                              {Enum_EstadoProyecto[u.estado]}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div
                                className='title-th'
                                data-title='Acciones: '
                              />
                              <Link to={`/proyecto/${u._id}`}>
                                <FontAwesomeIcon icon={faEye} color='blue' />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <div>No autorizado</div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PrivateComponent>
    </>
  );
}
