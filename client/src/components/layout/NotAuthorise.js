//NotAuthorise.js

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const NotAuthorise = ({setTitle, isAuthenticated}) => {
  useEffect(() => {
    setTitle('Not Authorise'); // update the title when the component is mounted
  }, [setTitle]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> NOT Authorise
      </h1>
      <p className="large">Sorry, you are not allowed to access this page</p>
    </section>
  );
};

NotAuthorise.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(NotAuthorise);
