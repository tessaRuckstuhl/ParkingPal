import { Alert, Snackbar } from '@mui/material';
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const ErrorContext = createContext();

export function ErrorContextProvider({ children }) {
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity:'' //error, warning, info, success are possible values here
  });


  const showSnack = (msg, severity) => {
    setSnack({ open: true, message: msg , severity: severity});
  };

  const handleClose = () => {
    setSnack({ open: false, message: '', severity: '' });
  };
  return (
    <ErrorContext.Provider
      value={{ snack, showSnack }}
    >
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleClose}
      ><Alert severity={snack.severity}>{snack.message}</Alert></Snackbar>
    </ErrorContext.Provider>
  );
}
export function useErrorSnack() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('Context must be within provider');
  }
  return context;
}
export default ErrorContext;