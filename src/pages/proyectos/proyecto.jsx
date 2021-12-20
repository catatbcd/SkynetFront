/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faMoneyBillWave,
  faUser,
  faBusinessTime,
  faReceipt,
  faIdCard,
  faPlusCircle,
  faEnvelope,
  faCalendarAlt,
  faPen,
  faFileSignature,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { GET_PROYECTO } from '../../graphql/proyectos/queries';
import PrivateComponent from '../../components/PrivateComponent';

export default function Proyecto(props) {
  const idUsuario = props._id;
  let EstudianteActivo = false;
  let inscripcionValida = false;
  const { _id } = useParams();
  const idProyecto = _id;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { idUsuario, idProyecto },
  });

  useEffect(() => {
    if (queryError) {
      toast.error('Error consultando los proyectos');
    }
  }, [queryError]);

  if (queryLoading) return <div>Cargando....</div>;
  return (
    <>
      <PrivateComponent roleList={['Administrador']}>
        <div className='FormCon'>
          <Link to='/proyectos'>
            <FontAwesomeIcon icon={faArrowLeft} color='gray' />
          </Link>
          <div className='row d-flex justify-content-center'>
            <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center' />
            <div className='card'>
              <div id='pattern' className='pattern'>
                <div className='c'>
                  <div className='main'>
                    <h1 className='titulo'> {queryData.VerProyecto.nombre} </h1>
                  </div>
                  <div className='c2'>
                    <h4 className='blue'>
                      <span className='middle'>Datos básicos</span>
                    </h4>
                    <div className='project-info'>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faMoneyBillWave} />
                          Presupuesto:
                        </div>
                        <div className='project-info-value'>
                          <span>$ {queryData.VerProyecto.presupuesto}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faBusinessTime} />
                          fase:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.fase}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          {' '}
                          <FontAwesomeIcon icon={faReceipt} />
                          estado:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.estado}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='c3'>
                    <h4 className='blue'>
                      <span className='middle'>Información Lider</span>
                    </h4>
                    <div className='project-info'>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faUser} />
                          Nombre:
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.nombre}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faIdCard} /> Identificacion:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.idUsuario}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faEnvelope} />
                          Email:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container'>
                <section className='pattern-description'>
                  <div className='mah-accordion'>
                    <div className='half'>
                      <div className='tab'>
                        <input id='tab-one' type='checkbox' name='tabs' />
                        <label htmlFor='tab-one'>Objetivos</label>
                        <div className='tab-content'>
                          <h3 className='blue'>
                            {' '}
                            <span className='middle'>Objetivo General:</span>
                          </h3>
                          <p>{queryData.VerProyecto.objetivosGenerales}</p>
                          <h3 className='blue'>
                            {' '}
                            <span className='middle'>
                              Objetivos Especificos:
                            </span>
                          </h3>
                          {queryData &&
                          queryData.VerProyecto.objetivosEspecificos.length >
                            0 ? (
                            <>
                              {queryData.VerProyecto.objetivosEspecificos.map(
                                x => (
                                  <div key={x._id}>
                                    <li>{x}</li>
                                  </div>
                                )
                              )}
                            </>
                          ) : (
                            <div>No hay objetivos especificos</div>
                          )}
                        </div>
                      </div>
                      <div className='tab'>
                        <input id='tab-two' type='checkbox' name='tabs' />
                        <label htmlFor='tab-two'>Avances</label>
                        <div className='tab-content'>
                          <div className='hr hr-8 dotted' />
                          {queryData &&
                          queryData.VerProyecto.avance.length > 0 ? (
                            <>
                              {queryData.VerProyecto.avance.map(x => (
                                <div key={x._id}>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                      Fecha:
                                    </span>
                                  </h3>

                                  <p>{x.fecha}</p>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faFileSignature} />
                                      Descripción:
                                    </span>
                                  </h3>
                                  <p>{x.descripcion}</p>
                                  <Link to={`/proyectos/EditarAvance/${x._id}`}>
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      color='yellow'
                                    />
                                  </Link>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faFileAlt} />
                                      Observaciones del Lider:
                                    </span>
                                  </h3>
                                  {x && x.observacionesDelLider.length > 0 ? (
                                    <>
                                      {x.observacionesDelLider.map(y => (
                                        <div key={y._id}>
                                          <li>{y}</li>
                                        </div>
                                      ))}
                                      <Link
                                        to={`/proyectos/avances/observacion/${x._id}`}
                                      >
                                        <FontAwesomeIcon
                                          icon={faPen}
                                          color='yellow'
                                        />
                                      </Link>
                                    </>
                                  ) : (
                                    <div>No hay Observaciones</div>
                                  )}
                                  <Link
                                    to={`/proyectos/avances/nuevaObservacion/${x._id}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPlusCircle}
                                      color='green'
                                    />
                                  </Link>
                                  <div className='hr hr-8 dotted' />
                                </div>
                              ))}
                            </>
                          ) : (
                            <div>No hay avances</div>
                          )}
                        </div>
                      </div>
                      <div className='tab'>
                        <input id='tab-three' type='checkbox' name='tabs' />
                        <label htmlFor='tab-three'>Inscripciones</label>
                        <div className='tab-content'>
                          <div className='hr hr-8 dotted' />
                          <div>
                            {queryData &&
                            queryData.VerProyecto.inscripcion.length > 0 ? (
                              <>
                                {queryData.VerProyecto.inscripcion.map(x => (
                                  <div key={x._id}>
                                    <div className='left_part'>
                                      <h4 className='blue'>
                                        <span className='middle'>
                                          Información Estudiante
                                        </span>
                                      </h4>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faUser} />
                                          Nombre:
                                        </div>
                                        <div className='project-info-value'>
                                          {' '}
                                          <span>{x.estudiante.nombre}</span>
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faIdCard} />
                                          Identificacion:{' '}
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.estudiante.idUsuario}</span>
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faEnvelope} />
                                          Email:{' '}
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.estudiante.email}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='right_part'>
                                      <h4 className='blue'>
                                        <span className='middle'>
                                          Información Inscripción
                                        </span>
                                      </h4>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                          />
                                          Fecha de ingreso:
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.fechaDeIngreso}</span>{' '}
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          {' '}
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                          />
                                          Fecha de Egreso:
                                        </div>
                                        <div className='project-info-value'>
                                          {' '}
                                          <span>{x.fechaDeEgreso}</span>{' '}
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faReceipt} />{' '}
                                          Estado:
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.estado}</span>
                                          <span>
                                            {' '}
                                            <Link
                                              to={`/proyectos/inscripciones/estado/${x._id}`}
                                            >
                                              <FontAwesomeIcon
                                                icon={faPen}
                                                color='yellow'
                                              />
                                            </Link>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='hr hr-8 dotted' />
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div>No hay inscripciones</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <footer role='contentinfo'>
                  <div
                    className='btn buttonAdd'
                    onClick={e => {
                      e.preventDefault();
                      window.location.href = `/proyectos/editar/${idProyecto}`;
                    }}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} color='white' />
                    Editar Proyecto
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </PrivateComponent>
      <PrivateComponent roleList={['Lider']}>
        <div className='FormCon'>
          <Link to='/proyectos'>
            <FontAwesomeIcon icon={faArrowLeft} color='gray' />
          </Link>
          <div className='row d-flex justify-content-center'>
            <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center' />
            <div className='card'>
              <div id='pattern' className='pattern'>
                <div className='c'>
                  <div className='main'>
                    <h1 className='titulo'> {queryData.VerProyecto.nombre} </h1>
                  </div>
                  <div className='c2'>
                    <h4 className='blue'>
                      <span className='middle'>Datos básicos</span>
                    </h4>
                    <div className='project-info'>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faMoneyBillWave} />
                          Presupuesto:
                        </div>
                        <div className='project-info-value'>
                          <span>$ {queryData.VerProyecto.presupuesto}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faBusinessTime} />
                          fase:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.fase}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faReceipt} />
                          estado:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.estado}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='c3'>
                    <h4 className='blue'>
                      <span className='middle'>Información Lider</span>
                    </h4>
                    <div className='project-info'>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faUser} />
                          Nombre:
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.nombre}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faIdCard} /> Identificacion:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.idUsuario}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faEnvelope} />
                          Email:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container'>
                <section className='pattern-description'>
                  <div className='mah-accordion'>
                    <div className='half'>
                      <div className='tab'>
                        <input id='tab-one' type='checkbox' name='tabs' />
                        <label htmlFor='tab-one'>Objetivos</label>
                        <div className='tab-content'>
                          <h3 className='blue'>
                            {' '}
                            <span className='middle'>Objetivo General:</span>
                          </h3>
                          <p>{queryData.VerProyecto.objetivosGenerales}</p>
                          <h3 className='blue'>
                            {' '}
                            <span className='middle'>
                              Objetivos Especificos:
                            </span>
                          </h3>
                          {queryData &&
                          queryData.VerProyecto.objetivosEspecificos.length >
                            0 ? (
                            <>
                              {queryData.VerProyecto.objetivosEspecificos.map(
                                x => (
                                  <div key={x._id}>
                                    <li>{x}</li>
                                  </div>
                                )
                              )}
                            </>
                          ) : (
                            <div>No hay objetivos especificos</div>
                          )}
                        </div>
                      </div>
                      <div className='tab'>
                        <input id='tab-two' type='checkbox' name='tabs' />
                        <label htmlFor='tab-two'>Avances</label>
                        <div className='tab-content'>
                          <div className='hr hr-8 dotted' />
                          {queryData &&
                          queryData.VerProyecto.avance.length > 0 ? (
                            <>
                              {queryData.VerProyecto.avance.map(x => (
                                <div key={x._id}>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                      Fecha:
                                    </span>
                                  </h3>
                                  <p>{x.fecha}</p>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faFileSignature} />
                                      Descripción:
                                    </span>
                                  </h3>
                                  <p>{x.descripcion}</p>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faFileAlt} />
                                      bservaciones del Lider:
                                    </span>
                                  </h3>
                                  {x && x.observacionesDelLider.length > 0 ? (
                                    <>
                                      {x.observacionesDelLider.map(i => (
                                        <div key={i._id}>
                                          <li>{i}</li>
                                          <Link
                                            to={`/proyectos/avances/observacion/${x._id}`}
                                          >
                                            <FontAwesomeIcon
                                              icon={faPen}
                                              color='yellow'
                                            />
                                          </Link>
                                        </div>
                                      ))}
                                    </>
                                  ) : (
                                    <div>No hay Observaciones</div>
                                  )}
                                  {queryData.VerProyecto.estado === 'Activo' ? (
                                    <>
                                      <Link
                                        to={`/proyectos/avances/nuevaObservacion/${x._id}`}
                                      >
                                        <FontAwesomeIcon
                                          icon={faPlusCircle}
                                          color='green'
                                        />
                                      </Link>
                                    </>
                                  ) : (
                                    <div />
                                  )}
                                  <div className='hr hr-8 dotted' />
                                </div>
                              ))}
                            </>
                          ) : (
                            <div>No hay avances</div>
                          )}
                        </div>
                      </div>
                      <div className='tab'>
                        <input id='tab-three' type='checkbox' name='tabs' />
                        <label htmlFor='tab-three'>Inscripciones</label>
                        <div className='tab-content'>
                          <div className='hr hr-8 dotted' />
                          <div>
                            {queryData &&
                            queryData.VerProyecto.inscripcion.length > 0 ? (
                              <>
                                {queryData.VerProyecto.inscripcion.map(x => (
                                  <div key={x._id}>
                                    <div className='left_part'>
                                      <h4 className='blue'>
                                        <span className='middle'>
                                          Información Estudiante
                                        </span>
                                      </h4>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faUser} />
                                          Nombre:
                                        </div>

                                        <div className='project-info-value'>
                                          {' '}
                                          <span>{x.estudiante.nombre}</span>
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faIdCard} />
                                          Identificacion:{' '}
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.estudiante.idUsuario}</span>
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faEnvelope} />
                                          Email:{' '}
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.estudiante.email}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='right_part'>
                                      <h4 className='blue'>
                                        <span className='middle'>
                                          Información Inscripción
                                        </span>
                                      </h4>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                          />
                                          Fecha de ingreso:
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.fechaDeIngreso}</span>{' '}
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                          />
                                          Fecha de Egreso:
                                        </div>
                                        <div className='project-info-value'>
                                          {' '}
                                          <span>{x.fechaDeEgreso}</span>{' '}
                                        </div>
                                      </div>
                                      <div className='project-info-row'>
                                        <div className='project-info-name'>
                                          <FontAwesomeIcon icon={faReceipt} />
                                          Estado:
                                        </div>
                                        <div className='project-info-value'>
                                          <span>{x.estado}</span>
                                          {queryData.VerProyecto.estado ===
                                          'Activo' ? (
                                            <span>
                                              {' '}
                                              <Link
                                                to={`/proyectos/inscripciones/estado/${x._id}`}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faPen}
                                                  color='yellow'
                                                />
                                              </Link>
                                            </span>
                                          ) : (
                                            <div />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className='hr hr-8 dotted' />
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div>No hay inscripciones</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {queryData.VerProyecto.estado === 'Activo' ? (
                  <footer role='contentinfo'>
                    <div
                      className='btn buttonAdd'
                      onClick={e => {
                        e.preventDefault();
                        window.location.href = `/proyectos/editar/${idProyecto}`;
                      }}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} color='white' />{' '}
                      Editar Proyecto
                    </div>
                  </footer>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </PrivateComponent>
      <PrivateComponent roleList={['Estudiante']}>
        {queryData.VerProyecto.estado === 'Activo' ? (
          queryData.VerProyecto.inscripcion.length > 0 ? (
            queryData.VerProyecto.inscripcion.forEach(x => {
              if (
                x.estudiante._id === idUsuario &&
                x.estado === 'Aceptada' &&
                x.fechaDeEgreso === null
              ) {
                EstudianteActivo = true;
                inscripcionValida = false;
              } else if (x.estudiante._id !== idUsuario) {
                inscripcionValida = true;
              } else if (
                x.estudiante._id === idUsuario &&
                x.fechaDeEgreso !== null
              ) {
                inscripcionValida = true;
              } else if (
                x.estudiante._id === idUsuario &&
                x.estado === 'Pendiente'
              ) {
                inscripcionValida = false;
              }
            })
          ) : (
            <div>{(inscripcionValida = true)}</div>
          )
        ) : (
          <div>{(inscripcionValida = false)}</div>
        )}

        {EstudianteActivo ? <div>{(inscripcionValida = false)}</div> : <div />}

        <div className='FormCon'>
          <Link to='/proyectos'>
            <FontAwesomeIcon icon={faArrowLeft} color='gray' />
          </Link>
          <div className='row d-flex justify-content-center'>
            <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center' />
            <div className='card'>
              {inscripcionValida ? (
                <div
                  className='btn buttonAdd'
                  onClick={e => {
                    e.preventDefault();
                    window.location.href = `/proyecto/inscripcion/${idProyecto}`;
                  }}
                >
                  <FontAwesomeIcon icon={faPlusCircle} color='white' />{' '}
                  Inscribirse
                </div>
              ) : (
                <div />
              )}

              <div id='pattern' className='pattern'>
                <div className='c'>
                  <div className='main'>
                    <h1 className='titulo'> {queryData.VerProyecto.nombre} </h1>
                  </div>

                  <div className='c2'>
                    <h4 className='blue'>
                      <span className='middle'>Datos básicos</span>
                    </h4>
                    <div className='project-info'>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faMoneyBillWave} />
                          Presupuesto:
                        </div>
                        <div className='project-info-value'>
                          <span>$ {queryData.VerProyecto.presupuesto}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faBusinessTime} />
                          fase:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.fase}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faReceipt} />
                          estado:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.estado}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='c3'>
                    <h4 className='blue'>
                      <span className='middle'>Información Lider</span>
                    </h4>
                    <div className='project-info'>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          {' '}
                          <FontAwesomeIcon icon={faUser} />
                          Nombre:
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.nombre}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          {' '}
                          <FontAwesomeIcon
                            icon={faIdCard}
                          /> Identificacion:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.idUsuario}</span>
                        </div>
                      </div>
                      <div className='project-info-row'>
                        <div className='project-info-name'>
                          <FontAwesomeIcon icon={faEnvelope} />
                          Email:{' '}
                        </div>
                        <div className='project-info-value'>
                          <span>{queryData.VerProyecto.lider.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='container'>
                <section className='pattern-description'>
                  <div className='mah-accordion'>
                    <div className='half'>
                      <div className='tab'>
                        <input id='tab-one' type='checkbox' name='tabs' />
                        <label htmlFor='tab-one'>Objetivos</label>
                        <div className='tab-content'>
                          <h3 className='blue'>
                            {' '}
                            <span className='middle'>Objetivo General:</span>
                          </h3>
                          <p>{queryData.VerProyecto.objetivosGenerales}</p>
                          <h3 className='blue'>
                            {' '}
                            <span className='middle'>
                              Objetivos Especificos:
                            </span>
                          </h3>
                          {queryData &&
                          queryData.VerProyecto.objetivosEspecificos.length >
                            0 ? (
                            <>
                              {queryData.VerProyecto.objetivosEspecificos.map(
                                x => (
                                  <div key={x._id}>
                                    <li>{x}</li>
                                  </div>
                                )
                              )}
                            </>
                          ) : (
                            <div>No hay objetivos especificos</div>
                          )}
                        </div>
                      </div>
                      <div className='tab'>
                        <input id='tab-two' type='checkbox' name='tabs' />
                        <label htmlFor='tab-two'>Avances</label>
                        <div className='tab-content'>
                          <div className='hr hr-8 dotted' />
                          {queryData &&
                          queryData.VerProyecto.avance.length > 0 ? (
                            <>
                              {queryData.VerProyecto.avance.map(x => (
                                <div key={x._id}>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                      Fecha:
                                    </span>
                                  </h3>
                                  <p>{x.fecha}</p>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faFileSignature} />
                                      Descripción:
                                    </span>
                                  </h3>
                                  <p>{x.descripcion}</p>
                                  <Link to={`/proyectos/EditarAvance/${x._id}`}>
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      color='yellow'
                                    />
                                  </Link>
                                  <h3 className='blue'>
                                    {' '}
                                    <span className='middle'>
                                      <FontAwesomeIcon icon={faFileAlt} />
                                      Observaciones del Lider:
                                    </span>
                                  </h3>
                                  {x && x.observacionesDelLider.length > 0 ? (
                                    <>
                                      {x.observacionesDelLider.map(y => (
                                        <div key={y._id}>
                                          <li>{y}</li>
                                        </div>
                                      ))}
                                    </>
                                  ) : (
                                    <div>No hay Observaciones</div>
                                  )}

                                  <div className='hr hr-8 dotted' />
                                </div>
                              ))}
                            </>
                          ) : (
                            <div>No hay avances</div>
                          )}
                          <div className='left_part' />
                          <div className='right_part'>
                            {EstudianteActivo ? (
                              <div
                                className='btn buttonAdd'
                                onClick={e => {
                                  e.preventDefault();
                                  window.location.href = `/proyectos/AgregarAvance/${queryData.VerProyecto._id}`;
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faPlusCircle}
                                  color='white'
                                />
                                Agregar Avance
                              </div>
                            ) : (
                              <div />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='tab'>
                        <input id='tab-three' type='checkbox' name='tabs' />
                        <label htmlFor='tab-three'>Inscripciones</label>
                        <div className='tab-content'>
                          <div className='hr hr-8 dotted' />
                          <div>
                            {queryData &&
                            queryData.VerProyecto.inscripcion.length > 0 ? (
                              <>
                                {queryData.VerProyecto.inscripcion.map(x => {
                                  if (
                                    x.estudiante._id === idUsuario &&
                                    x.estado === 'Aceptada' &&
                                    x.fechaDeEgreso === null
                                  ) {
                                    EstudianteActivo = 'true';
                                  }
                                  return (
                                    <div key={x._id}>
                                      <div className='left_part'>
                                        <h4 className='blue'>
                                          <span className='middle'>
                                            Información Estudiante
                                          </span>
                                        </h4>
                                        <div className='project-info-row'>
                                          <div className='project-info-name'>
                                            <FontAwesomeIcon icon={faUser} />
                                            Nombre:
                                          </div>
                                          <div className='project-info-value'>
                                            {' '}
                                            <span>{x.estudiante.nombre}</span>
                                          </div>
                                        </div>
                                        <div className='project-info-row'>
                                          <div className='project-info-name'>
                                            <FontAwesomeIcon icon={faIdCard} />
                                            Identificacion:{' '}
                                          </div>
                                          <div className='project-info-value'>
                                            <span>
                                              {x.estudiante.idUsuario}
                                            </span>
                                          </div>
                                        </div>
                                        <div className='project-info-row'>
                                          <div className='project-info-name'>
                                            <FontAwesomeIcon
                                              icon={faEnvelope}
                                            />
                                            Email:{' '}
                                          </div>
                                          <div className='project-info-value'>
                                            <span>{x.estudiante.email}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='right_part'>
                                        <h4 className='blue'>
                                          <span className='middle'>
                                            Información Inscripción
                                          </span>
                                        </h4>
                                        <div className='project-info-row'>
                                          <div className='project-info-name'>
                                            <FontAwesomeIcon
                                              icon={faCalendarAlt}
                                            />
                                            Fecha de ingreso:
                                          </div>
                                          <div className='project-info-value'>
                                            <span>{x.fechaDeIngreso}</span>{' '}
                                          </div>
                                        </div>
                                        <div className='project-info-row'>
                                          <div className='project-info-name'>
                                            <FontAwesomeIcon
                                              icon={faCalendarAlt}
                                            />
                                            Fecha de Egreso:
                                          </div>
                                          <div className='project-info-value'>
                                            {' '}
                                            <span>{x.fechaDeEgreso}</span>{' '}
                                          </div>
                                        </div>
                                        <div className='project-info-row'>
                                          <div className='project-info-name'>
                                            <FontAwesomeIcon icon={faReceipt} />
                                            Estado:
                                          </div>
                                          <div className='project-info-value'>
                                            <span>{x.estado}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='hr hr-8 dotted' />
                                    </div>
                                  );
                                })}
                              </>
                            ) : (
                              <div>No hay inscripciones</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </PrivateComponent>
    </>
  );
}
