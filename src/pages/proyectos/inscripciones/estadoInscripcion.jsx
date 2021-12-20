/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable no-restricted-imports */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ButtonLoading from '../../../components/ButtonLoading';
import useFormData from '../../../hooks/useFormData';
import { GET_INSCRIPCION } from '../../../graphql/proyectos/queries';
import DropDown from '../../../components/Dropdown';
import { Enum_EstadoInscripcion } from '../../../utils/enums';
import { ESTADO_INSCRIPCION } from '../../../graphql/proyectos/mutations';

export default function EstadoInscripcion(props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario = props._id;
  const { _id } = useParams();
  const idInscripcion = _id;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_INSCRIPCION, {
    variables: { idUsuario, idInscripcion },
  });

  const [
    EditarEstado,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ESTADO_INSCRIPCION);

  const submitForm = e => {
    e.preventDefault();
    delete formData.rol;
    const { estado } = formData;
    EditarEstado({
      variables: { idUsuario, idInscripcion, estado },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Estado modificado correctamente');

      setTimeout(() => {
        window.location.href = `/proyectos/inscripciones`;
      }, 5000);
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el estado de la inscripcion');
      setTimeout(() => {
        window.location.href = `/proyectos/inscripciones`;
      }, 5000);
    }

    if (queryError) {
      toast.error('Error consultando la inscripcion');
      setTimeout(() => {
        window.location.href = `/proyectos/inscripciones`;
      }, 5000);
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  const imprimir = [];
  queryData.getInscripcion.forEach(u => {
    if (u.inscripcion.length > 0) {
      u.inscripcion.forEach(x => {
        if (x._id === idInscripcion) {
          imprimir.push({
            _id: x._id,
            nombreP: u.nombre,
            nombreE: x.estudiante.nombre,
            idEstudiante: x.estudiante.idUsuario,
            estado: x.estado,
            fechaDeEgreso: x.fechaDeEgreso,
            fechaDeIngreso: x.fechaDeIngreso,
          });
        }
      });
    }
  });
  return (
    <div className='FormCon'>
      <Link to='/proyectos/avances'>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
          <h3>Cambiar Estado De La Inscripción</h3>

          <div className='card'>
            <form
              onSubmit={submitForm}
              onChange={updateFormData}
              ref={form}
              className='form-card'
            >
              {imprimir.map(x => {
                return (
                  <div key={x._id}>
                    <div className='row justify-content-between text-left'>
                      <div className='form-group col-12 flex-column d-flex'>
                        <label className='form-control-label px-3'>
                          Nombre del Proyecto:
                        </label>

                        <span className='noEdit'>{x.nombreP}</span>
                      </div>
                    </div>

                    <div className='row justify-content-between text-left'>
                      <div className='form-group col-sm-6 flex-column d-flex'>
                        <label className='form-control-label px-3'>
                          Identificación del Estudiante:
                        </label>{' '}
                        <span className='noEdit'>{x.idEstudiante}</span>{' '}
                      </div>
                      <div className='form-group col-sm-6 flex-column d-flex'>
                        {' '}
                        <label className='form-control-label px-3'>
                          Nombre del Estudiante:
                        </label>
                        <span className='noEdit'>{x.nombreE}</span>
                      </div>
                    </div>

                    <div className='md:flex items-center mt-8'>
                      <div className='w-full flex flex-col'>
                        <label className='font-semibold leading-none'>
                          Estado de la inscripción:
                        </label>
                        <DropDown
                          label='Seleccione el estado de la inscripcion'
                          name='estado'
                          defaultValue={Enum_EstadoInscripcion[x.estado]}
                          required
                          options={Enum_EstadoInscripcion}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className='row justify-content-end'>
                <div className='form-group col-sm-6'>
                  <ButtonLoading loading={mutationLoading} text='Confirmar' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
