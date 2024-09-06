import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, loading, error, onDeleteUser, onUpdateUser }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User Management</h1>
      <Link to="/create">
        <button>Create User</button>
      </Link>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/edit/${user.id}`} id="edit">
                  <button>Edit</button>
                </Link>
                <button onClick={() => onDeleteUser(user.id)} id='red'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
