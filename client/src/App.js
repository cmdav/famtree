import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/registration/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import { LOGOUT } from './actions/types';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/layout/NotFound';
import NotAuthorise from './components/layout/NotAuthorise';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import EditProfile from './components/profile/EditProfile';
import AddMember from './components/registration/AddMember';


const App = () => {
  const [title, setTitle] = useState('Welcome to FamTree'); // site title

  useEffect(() => {
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Navbar />
        <Alert />
        <Routes>
          {/* Route for all roles */}
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register setTitle={setTitle} />} />
          <Route path='/login' element={<Login setTitle={setTitle} />} />
          <Route path='/*' element={<NotFound setTitle={setTitle} allowedRoles={['user']} />} />
          <Route path='unauthorized' element={<NotAuthorise setTitle={setTitle} allowedRoles={['user']} />} />
          
          {/* Route for user roles */}
          
          <Route
            path='editprofile/:id'
            element={<PrivateRoute setTitle={setTitle} component={EditProfile} allowedRoles={['user']} />}
          />
          
          <Route
            path='dashboard'
            element={<PrivateRoute setTitle={setTitle} component={Dashboard} allowedRoles={['user']} />}
          />

          <Route
            path='addmember'
            element={<PrivateRoute setTitle={setTitle} component={AddMember} allowedRoles={['user']} />}
          />
          
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
