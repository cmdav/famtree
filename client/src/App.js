import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import Alert from './components/layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';


const App = () => {
  const [title, setTitle] = useState('Welcome to FamTree'); // site title

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

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
