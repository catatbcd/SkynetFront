/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { EDITAR_PROYECTO } from '../../graphql/proyectos/mutations';
import { GET_PROYECTO } from '../../graphql/proyectos/queries';

export default function EditarProyecto(props) {
  let ex = 0;

  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario = props._id;
  const { _id } = useParams();
  const idProyecto = _id;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { idUsuario, idProyecto },
  });

  const [
    EditarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);

  const submitForm = e => {
    e.preventDefault();

    formData.presupuesto = parseInt(formData.presupuesto, 10);
    const arr = [];

    for (const property in formData) {
      if (property.includes('E')) {
        arr.push(formData[property]);
        delete formData[property];
      }
    }
    formData.objetivosEspecificos = arr;

    const campos = formData;
    EditarProyecto({
      variables: { idUsuario, idProyecto, campos },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto actualizado correctamente');

      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }
  }, [idProyecto, mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error actualizando el proyecto');
      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }

    if (queryError) {
      toast.error('Error consultando el proyecto');
      setTimeout(() => {
        window.location.href = `/proyecto/${idProyecto}`;
      }, 5000);
    }
  }, [queryError, mutationError, idProyecto]);

  if (queryLoading) return <div>Cargando....</div>;
  return (
    <div className='FormCon'>
      <Link to='/proyectos'>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
          <h3>Editar Proyecto</h3>
          <div className='card'>
            <form
              onSubmit={submitForm}
              onChange={updateFormData}
              ref={form}
              className='form-card'
            >
              <div className='row justify-content-between text-left'>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Nombre del Proyecto:
                  </label>
                  <input
                    type='text'
                    name='nombre'
                    defaultValue={queryData.VerProyecto.nombre}
                    required
                  />{' '}
                </div>
                <div className='form-group col-sm-6 flex-column d-flex'>
                  <label className='form-control-label px-3'>
                    Presupuesto:
                  </label>
                  <input
                    type='number'
                    name='presupuesto'
                    defaultValue={queryData.VerProyecto.presupuesto}
                    required
                  />{' '}
                </div>
              </div>
              <div className='row justify-content-between text-left'>
                <div className='form-group col-12 flex-column d-flex'>
                  {' '}
                  <label className='form-control-label px-3'>
                    Objetivo General:
                  </label>
                  <textarea
                    name='objetivosGenerales'
                    defaultValue={queryData.VerProyecto.objetivosGenerales}
                    required
                    type='text'
                  />{' '}
                </div>
              </div>
              <div className='row justify-content-between text-left'>
                <div className='form-group col-12 flex-column d-flex'>
                  <label className='font-semibold leading-none'>
                    Objetivos Específicos:
                  </label>

                  {queryData.VerProyecto.objetivosEspecificos.length > 0 ? (
                    queryData.VerProyecto.objetivosEspecificos.map(
                      (u, index) => {
                        ex = index;
                        return (
                          <div key={u.index}>
                            <input
                              type='text'
                              name={`E${index}`}
                              defaultValue={u}
                              required
                              ex={index}
                            />
                          </div>
                        );
                      }
                    )
                  ) : (
                    <input type='text' name='E0' required />
                  )}
                  <div id='inputDiv' />
                  <button
                    onClick={e => {
                      e.preventDefault();
                      ex += 1;
                      const parent = document.getElementById('inputDiv');

                      const input = document.createElement('input');
                      input.type = 'text';
                      input.name = `E${ex}`;

                      parent.appendChild(input);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                    Agregar objetivo específico
                  </button>
                </div>
              </div>

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
