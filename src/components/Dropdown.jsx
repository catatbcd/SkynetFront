import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const DropDown = ({ label, name, defaultValue = '', required, options }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const optionsSelect = [['', label, true], ...Object.entries(options)];
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
    <div htmlFor={name} className='d-flex"'>
      <div className='form-group'>
        <div className='col-sm-8'>
          <select
            required={required}
            name={name}
            className='form-control show-tick rounded-pill input-sm'
            value={selectedValue}
            onChange={e => setSelectedValue(e.target.value)}
          >
            {optionsSelect.map(o => (
              <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
                {o[1]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
