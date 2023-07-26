// EstadoContext.js
import React, { createContext, useState } from 'react';

const EstadoContext = createContext();

const EstadoProvider = ({ children }) => {
  const [refre, setRefre] = useState(false);

  return (
    <EstadoContext.Provider value={{ refre, setRefre }}>
      {children}
    </EstadoContext.Provider>
  );
};

export { EstadoContext, EstadoProvider };
