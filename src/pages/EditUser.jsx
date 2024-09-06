import React from 'react';
import UserForm from '../components/UserForm';

const EditUser = ({ onUpdateUser }) => {
  return <UserForm isEdit={true} onUpdateUser={onUpdateUser} />;
};

export default EditUser;
