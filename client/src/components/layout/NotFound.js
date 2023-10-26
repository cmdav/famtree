import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const NotFound = ({ setTitle, isAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(true); // add a loading state

  useEffect(() => {
    setTitle('Not Found'); // update the title when the component is mounted
    setTimeout(() => setIsLoading(false), 500); // add a delay to update the loading state
  }, [setTitle]);

  if (isLoading) { // render a loading spinner while the authentication state is updating
    return (
      <section className="container">
        <Spinner />;
      </section>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist</p>
    </section>
  );
};

NotFound.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(NotFound);