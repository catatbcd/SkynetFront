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
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonLoading from '../../components/ButtonLoading';
import useFormData from '../../hooks/useFormData';
import { CREAR_PROYECTO } from '../../graphql/proyectos/mutations';

export default function CrearProyecto(props) {
  let ex = 0;

  const { form, formData, updateFormData } = useFormData(null);
  const idUsuario = props._id;

  const [
    CrearProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREAR_PROYECTO);

  const submitForm = e => {
    e.preventDefault();
    const arr = [];

    for (const property in formData) {
      if (property.includes('E')) {
        arr.push(formData[property]);
        delete formData[property];
      }
    }
    formData.objetivosEspecificos = arr;
    const campos = formData;
    campos.presupuesto = parseInt(campos.presupuesto, 10);
    CrearProyecto({
      variables: { idUsuario, campos },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Proyecto creado correctamente');
      setTimeout(() => {
        window.location.href = `/proyecto/${mutationData.crearProyecto._id}`;
      }, 5000);
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error creando el proyecto');
      setTimeout(() => {
        window.location.href = `/proyecto/crear`;
      }, 5000);
    }
  }, [mutationError]);

  return (
    <div>
      <div className='FormCon'>
        <Link to='/proyectos'>
          <FontAwesomeIcon icon={faArrowLeft} color='gray' />
        </Link>
        <div className='row d-flex justify-content-center'>
          <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
            <h3>Crear Proyecto</h3>
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
                      <span className='text-danger'> *</span>
                    </label>
                    <input type='text' name='nombre' required />{' '}
                  </div>
                  <div className='form-group col-sm-6 flex-column d-flex'>
                    <label className='form-control-label px-3'>
                      Presupuesto:
                      <span className='text-danger'> *</span>
                    </label>
                    <input type='number' name='presupuesto' required />{' '}
                  </div>
                </div>
                <div className='row justify-content-between text-left'>
                  <div className='form-group col-12 flex-column d-flex'>
                    {' '}
                    <label className='form-control-label px-3'>
                      Objetivo General:<span className='text-danger'> *</span>
                    </label>
                    <textarea name='objetivosGenerales' required type='text' />{' '}
                  </div>
                </div>
                <div className='row justify-content-between text-left'>
                  <div
                    className='form-group col-12 flex-column d-flex'
                    id='inputDiv'
                  >
                    <label className='font-semibold leading-none'>
                      Objetivos Específicos:
                    </label>

                    <input type='text' name='E0' required />
                  </div>
                  <button
                    onClick={() => {
                      ex += 1;
                      const parent = document.getElementById('inputDiv');

                      const input = document.createElement('input');
                      input.type = 'text';
                      input.name = `E${ex}`;
                      input.required = true;
                      parent.appendChild(input);
                    }}
                  >
                    {' '}
                    <FontAwesomeIcon icon={faPlusCircle} />
                    Agregar objetivo específico
                  </button>
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
    </div>
  );
}
