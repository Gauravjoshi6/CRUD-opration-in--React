import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              users={users}
              loading={loading}
              error={error}
              onDeleteUser={handleDeleteUser}
              onUpdateUser={handleUpdateUser}
            />
          }
        />
        <Route path="/create" element={<CreateUser onAddUser={handleAddUser} />} />
        <Route path="/edit/:id" element={<EditUser onUpdateUser={handleUpdateUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
