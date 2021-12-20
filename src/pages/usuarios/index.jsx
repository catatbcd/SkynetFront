/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEdit } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import { Enum_Rol, Enum_EstadoUsuario } from '../../utils/enums';
import PrivateRoute from '../../components/PrivateRoute';
import PrivateComponent from '../../components/PrivateComponent';

import { GET_USUARIOS } from '../../graphql/usuarios/queries';

export default function IndexUsuarios(props) {
  const { _id } = props;

  const { data, error, loading } = useQuery(GET_USUARIOS, {
    variables: { _id },
  });
  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);
  if (loading) return <ReactLoading type='bubbles' color='blue' />;

  return (
    <PrivateRoute roleList={['Administrador', 'Lider']}>
      <>
        <PrivateComponent roleList={['Administrador']}>
          <div className='FormCon'>
            <h1 className='titulo'> Usuarios Registrados</h1>
            <div className='card'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Identificación</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.Usuarios ? (
                    <>
                      {data.Usuarios.map(u => {
                        return (
                          <tr key={u._id}>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Nombre: '
                                />
                                {u.nombre}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Email: '
                                />
                                {u.email}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Identificación: '
                                />
                                {u.idUsuario}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div className='title-th' data-title='Rol: ' />
                                {Enum_Rol[u.rol]}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Estado: '
                                />
                                {Enum_EstadoUsuario[u.estado]}
                                <Link to={`/usuarios/cambiarEstado/${u._id}`}>
                                  <FontAwesomeIcon icon={faPen} />
                                </Link>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Acciones: '
                                />
                                <Link to={`/usuarios/editar/${u._id}`}>
                                  <FontAwesomeIcon icon={faEdit} />
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
            <h1 className='titulo'> Estudiantes Registrados</h1>
            <div className='card'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Identificación</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.Usuarios ? (
                    <>
                      {data.Usuarios.map(u => {
                        if (u.rol === 'Estudiante') {
                          return (
                            <tr key={u._id}>
                              <td>
                                <div>
                                  <div
                                    className='title-th'
                                    data-title='Nombre: '
                                  />
                                  {u.nombre}
                                </div>
                              </td>
                              <td>
                                <div>
                                  <div
                                    className='title-th'
                                    data-title='Email: '
                                  />
                                  {u.email}
                                </div>
                              </td>
                              <td>
                                <div>
                                  <div
                                    className='title-th'
                                    data-title='Identificación: '
                                  />
                                  {u.idUsuario}
                                </div>
                              </td>
                              <td>
                                <div>
                                  <div
                                    className='title-th'
                                    data-title='Rol: '
                                  />
                                  {Enum_Rol[u.rol]}
                                </div>
                              </td>
                              <td>
                                <div>
                                  <div
                                    className='title-th'
                                    data-title='Estado: '
                                  />
                                  {Enum_EstadoUsuario[u.estado]}

                                  <Link to={`/usuarios/cambiarEstado/${u._id}`}>
                                    <FontAwesomeIcon icon={faPen} />
                                  </Link>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <div
                                    className='title-th'
                                    data-title='Acciones: '
                                  />
                                  <Link to={`/usuarios/editar/${u._id}`}>
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                        return <div>No autorizado</div>;
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
    </PrivateRoute>
  );
}
