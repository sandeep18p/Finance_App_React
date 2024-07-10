import React from 'react';
import "./styles.css"

const Input=({ type,label, state, setState, placeholder }) => {
  return (
    <div className='input-wrapper'>
      <p className='label-input'>{label}</p>
      <input
        type ={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className='custom-input'
      />
    </div>
  );
}

export default Input;
