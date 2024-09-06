import React from 'react';
import UserList from '../components/UserList';

const Home = ({ users, loading, error, onDeleteUser, onUpdateUser }) => {
  return (
    <div>
      <UserList
        users={users}
        loading={loading}
        error={error}
        onDeleteUser={onDeleteUser}
        onUpdateUser={onUpdateUser}
      />
    </div>
  );
};

export default Home;
