import React, { useState, useEffect } from 'react';

function Input() {
  const [nombre, setNombre] = useState('');
  const [estado2, setEstado2] = useState('');

  useEffect(() => {
    console.log('Hola');
  },[estado2,nombre]);

  return (
    <div>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
          <input
        type="text"
        value={estado2}
        onChange={(e) => setEstado2(e.target.value)}
      />
    </div>
  );
}

export default Input;