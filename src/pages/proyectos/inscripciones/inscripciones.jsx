/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Enum_EstadoInscripcion } from '../../../utils/enums';
import PrivateComponent from '../../../components/PrivateComponent';
import { INSCRIPCIONES } from '../../../graphql/proyectos/queries';

export default function Inscripciones(props) {
  const { nombre } = props;
  const idUsuario = props._id;
  const { data, error, loading } = useQuery(INSCRIPCIONES, {
    variables: { idUsuario },
  });
  useEffect(() => {
    if (error) {
      toast.error('Error consultando los proyectos');
    }
  }, [error]);
  if (loading) return <ReactLoading type='bubbles' color='blue' />;

  const imprimir = [];
  if (data.ListarInscripciones) {
    data.ListarInscripciones.forEach(u => {
      if (u.inscripcion.length > 0) {
        u.inscripcion.forEach(x => {
          imprimir.push({
            _id: x._id,
            nombre: u.nombre,
            estadoP: u.estado,
            lider: u.lider,
            nombreE: x.estudiante.nombre,
            _idE: x.estudiante._id,
            idEstudiante: x.estudiante.idUsuario,
            estado: x.estado,
            fechaDeEgreso: x.fechaDeEgreso,
            fechaDeIngreso: x.fechaDeIngreso,
          });
        });
      }
    });
  }

  return (
    <>
      <PrivateComponent roleList={['Administrador']}>
        <div className='FormCon'>
          <h1 className='titulo'> Inscripciones A Proyectos</h1>

          <div className='card'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Nombre del proyecto</th>
                  <th>Nombre del estudiante</th>
                  <th>Identificación del estudiante</th>
                  <th>Estado</th>
                  <th>Fecha de Ingreso </th>
                  <th>Fecha de Egreso </th>
                </tr>
              </thead>
              <tbody>
                {data && data.ListarInscripciones ? (
                  <>
                    {imprimir.map(x => {
                      return (
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
                                data-title='Nombre del estudiante: '
                              />
                              {x.nombreE}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div
                                className='title-th'
                                data-title='Identificación del estudiante: '
                              />
                              {x.idEstudiante}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className='title-th' data-title='Estado: ' />
                              {Enum_EstadoInscripcion[x.estado]}
                              {x.estadoP === 'Activo' ? (
                                <Link
                                  to={`/proyectos/inscripciones/estado/${x._id}`}
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
                          </td>
                          <td>
                            <div>
                              <div
                                className='title-th'
                                data-title='Fecha de Ingreso: '
                              />
                              {x.fechaDeIngreso}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div
                                className='title-th'
                                data-title='Fecha de Egreso: '
                              />
                              {x.fechaDeEgreso}
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
          <h1 className='titulo'> Mis Inscripciones A Proyectos</h1>

          <div className='card'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Nombre del proyecto</th>
                  <th>Nombre del estudiante</th>
                  <th>Identificación del estudiante</th>
                  <th>Estado</th>
                  <th>Fecha de Ingreso </th>
                  <th>Fecha de Egreso </th>
                </tr>
              </thead>
              <tbody>
                {data && data.ListarInscripciones ? (
                  <>
                    {imprimir.map(x => {
                      if (x._idE === idUsuario) {
                        return (
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
                                  data-title='Nombre del estudiante: '
                                />
                                {x.nombreE}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Identificación del estudiante: '
                                />
                                {x.idEstudiante}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Estado: '
                                />
                                {Enum_EstadoInscripcion[x.estado]}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Fecha de Ingreso: '
                                />
                                {x.fechaDeIngreso}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Fecha de Egreso: '
                                />
                                {x.fechaDeEgreso}
                              </div>
                            </td>
                          </tr>
                        );
                      }
                      return <div />;
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
          <h1 className='titulo'>
            {' '}
            Inscripciones A Proyectos Liderados Por: {nombre}
          </h1>

          <div className='card'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Nombre del proyecto</th>
                  <th>Nombre del estudiante</th>
                  <th>Identificación del estudiante</th>
                  <th>Estado</th>
                  <th>Fecha de Ingreso </th>
                  <th>Fecha de Egreso </th>
                </tr>
              </thead>
              <tbody>
                {data && data.ListarInscripciones ? (
                  <>
                    {imprimir.map(x => {
                      if (x.lider === idUsuario) {
                        return (
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
                                  data-title='Nombre del estudiante: '
                                />
                                {x.nombreE}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Identificación del estudiante: '
                                />
                                {x.idEstudiante}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Estado: '
                                />
                                {Enum_EstadoInscripcion[x.estado]}

                                {x.estadoP === 'Activo' ? (
                                  <Link
                                    to={`/proyectos/inscripciones/estado/${x._id}`}
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
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Fecha de Ingreso: '
                                />
                                {x.fechaDeIngreso}
                              </div>
                            </td>
                            <td>
                              <div>
                                <div
                                  className='title-th'
                                  data-title='Fecha de Egreso: '
                                />
                                {x.fechaDeEgreso}
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
  );
}
