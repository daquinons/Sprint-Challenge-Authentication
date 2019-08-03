import React from 'react';
import { Redirect } from 'react-router-dom';

export default () => {
  localStorage.clear('token');
  return <Redirect to="/signin" />;
};
