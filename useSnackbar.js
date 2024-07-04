// useSnackbar.js
import { useState } from 'react';

export const useSnackbar = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (msg) => {
    setMessage(msg);
    setVisible(true);
  };

  const hideSnackbar = () => setVisible(false);

  return { visible, message, showSnackbar, hideSnackbar };
};
