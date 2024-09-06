import React from 'react';
import UserForm from '../components/UserForm';

const CreateUser = ({ onAddUser }) => {
  return <UserForm isEdit={false} onAddUser={onAddUser} />;
};

export default CreateUser;
