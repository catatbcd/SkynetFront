/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-imports */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';
import ButtonLoading from '../../../components/ButtonLoading';
import useFormData from '../../../hooks/useFormData';
import { VER_AVANCE } from '../../../graphql/proyectos/queries';
import { ADD_OBSERVACION } from '../../../graphql/proyectos/mutations';

export default function NuevaObservacion(props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario = props._id;
  const { _id } = useParams();
  const idAvance = _id;

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(VER_AVANCE, {
    variables: { idUsuario, idAvance },
  });

  const [
    AddObservacion,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_OBSERVACION);

  const submitForm = e => {
    e.preventDefault();
    const arr = [];
    for (const property in formData) {
      if (property.includes('E')) {
        if (formData[property] !== '') {
          arr.push(formData[property]);
        }
        delete formData[property];
      }
    }
    arr.push(formData.observacionesDelLider);
    const observacionesDelLider = arr;
    AddObservacion({
      variables: { idUsuario, idAvance, observacionesDelLider },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Nueva observacion agregada correctamente');

      setTimeout(() => {
        window.location.href = `/proyectos/avances`;
      }, 5000);
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error agregando la observacion');

      setTimeout(() => {
        window.location.href = `/proyectos/avances`;
      }, 5000);
    }

    if (queryError) {
      toast.error('Error consultando avance');

      setTimeout(() => {
        window.location.href = `/proyectos/avances`;
      }, 5000);
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <ReactLoading type='bubbles' color='blue' />;

  const imprimir = [];
  queryData.VerAvance.forEach(u => {
    if (u.avance.length > 0) {
      u.avance.forEach(x => {
        imprimir.push({
          nombre: u.nombre,
          _id: x._id,
          fecha: x.fecha,
          descripcion: x.descripcion,
          observacionesDelLider: x.observacionesDelLider,
        });
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
          <h3>Nueva Observación</h3>

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
                      <div className='form-group col-sm-6 flex-column d-flex'>
                        <label className='form-control-label px-3'>
                          Nombre del Proyecto:
                        </label>{' '}
                        <span className='noEdit'>{x.nombre}</span>{' '}
                      </div>
                      <div className='form-group col-sm-6 flex-column d-flex'>
                        <label className='form-control-label px-3'>
                          Fecha del Avance:
                        </label>
                        <span className='noEdit'>{x.fecha}</span>
                      </div>
                    </div>
                    <div className='row justify-content-between text-left'>
                      <div className='form-group col-12 flex-column d-flex'>
                        <label className='form-control-label px-3'>
                          Descripción del Avance:
                        </label>
                        <input
                          type='text'
                          name='descripcion'
                          defaultValue={x.descripcion}
                          required
                          className='noEdit'
                        />
                      </div>
                    </div>

                    <div className='row justify-content-between text-left'>
                      <div className='form-group col-12 flex-column d-flex'>
                        <label className='form-control-label px-3'>
                          Observaciones del lider:
                        </label>
                        {x.observacionesDelLider.length > 0 ? (
                          x.observacionesDelLider.map((u, index) => {
                            return (
                              <input
                                type='text'
                                name={`E${index}`}
                                defaultValue={u}
                              />
                            );
                          })
                        ) : (
                          <div />
                        )}

                        <input
                          type='text'
                          name='observacionesDelLider'
                          required
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className='row justify-content-end'>
                <div className='form-group col-sm-6'>
                  <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
