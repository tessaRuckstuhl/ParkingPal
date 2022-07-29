import React, { useContext, useEffect } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useNavigate } from 'react-router-dom';

const AuthComponent = (props) => {
  const { jwt } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt || jwt === ''|| jwt === undefined) {
      return navigate('/login');
    }
  }, [jwt]);
  return (
    <div>
      {props.children}
    </div>
  );
};

export default AuthComponent;
