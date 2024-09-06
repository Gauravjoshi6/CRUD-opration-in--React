import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = ({ isEdit, onAddUser, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit) {
      console.log('Fetching user with ID:', id); // Debugging line
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          if (response.data) {
            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
          } else {
            setError('User not found.');
          }
        })
        .catch((error) => {
          setError('Failed to fetch user data. The user may not exist.'); // Improved error message
          console.error('Error fetching user data:', error); // Debugging line
        });
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, phone };

    if (isEdit) {
      console.log('Updating user with ID:', id); // Debugging line
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${id}`, userData)
        .then((response) => {
          onUpdateUser(response.data); // Update the user in the list
          navigate('/');
        })
        .catch((error) => {
          setError('Failed to update user data.');
          console.error('Error updating user data:', error); // Debugging line
        });
    } else {
      axios
        .post('https://jsonplaceholder.typicode.com/users', userData)
        .then((response) => {
          onAddUser(response.data); // Add the new user to the list
          navigate('/');
        })
        .catch((error) => {
          setError('Failed to create user data.');
          console.error('Error creating user data:', error); // Debugging line
        });
    }
  };

  return (
    <div className='forms'>
      <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='lable'>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='lable'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='lable'>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;
