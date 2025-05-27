import React, { createContext, useContext, useState, useEffect } from 'react';
import { colorBlindThemes } from './theme';

const ColorBlindContext = createContext();

export const useColorBlind = () => useContext(ColorBlindContext);

export const ColorBlindProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('colorblindMode') || 'none';
  });

  useEffect(() => {
    localStorage.setItem('colorblindMode', mode);
  }, [mode]);

  const theme = colorBlindThemes[mode] || colorBlindThemes['none'];

  return (
    <ColorBlindContext.Provider value={{ mode, setMode, theme }}>
      {children}
    </ColorBlindContext.Provider>
  );
}; 