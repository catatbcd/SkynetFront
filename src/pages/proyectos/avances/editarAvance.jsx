/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
/* eslint-disable import/order */
/* eslint-disable no-restricted-imports */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonLoading from '../../../components/ButtonLoading';
import useFormData from '../../../hooks/useFormData';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { VER_AVANCE } from '../../../graphql/proyectos/queries';
import { EDIT_AVANCE } from '../../../graphql/proyectos/mutations';

export default function EditarAvance(props) {
  const { form, formData, updateFormData } = useFormData(null);
  const idEstudiante = props._id;
  const idUsuario = idEstudiante;
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
    EditarEstado,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_AVANCE);

  const submitForm = e => {
    e.preventDefault();
    delete formData.rol;
    const { descripcion } = formData;
    EditarEstado({
      variables: { idEstudiante, idAvance, descripcion },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Avance actualizado correctamente');
      setTimeout(() => {
        window.location.href = `/proyectos`;
      }, 5000);
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error actualizando el avance');

      setTimeout(() => {
        window.location.href = `/proyectos`;
      }, 5000);
    }

    if (queryError) {
      toast.error('Error consultando el avance');

      setTimeout(() => {
        window.location.href = `/proyectos`;
      }, 5000);
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <ReactLoading type='bubbles' color='blue' />;

  const imprimir = [];
  queryData.VerAvance.forEach(u => {
    u.avance.forEach(x => {
      imprimir.push({
        _id: x._id,
        nombre: u.nombre,

        fecha: x.fecha,
        descripcion: x.descripcion,
        observacionesDelLider: x.observacionesDelLider,
      });
    });
  });

  return (
    <div className='FormCon'>
      <Link to='/proyectos/avances'>
        <FontAwesomeIcon icon={faArrowLeft} color='gray' />
      </Link>
      <div className='row d-flex justify-content-center'>
        <div className='col-xl-7 col-lg-8 col-md-9 col-11 text-center'>
          <h3>Editar Avance</h3>

          <div className='card'>
            <form
              onSubmit={submitForm}
              onChange={updateFormData}
              ref={form}
              className='form-card'
            >
              {imprimir.map(x => (
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
                      className='leading-none text-gray-600 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-grey-100 border rounded border-gray-200'
                    />
                  </div>
                </div>
              ))}

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

      <Link to='/proyectos/avances'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
    </div>
  );
}
