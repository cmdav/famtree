import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: AuthenticatedPage,
  setTitle,
  auth: { isAuthenticated, loading, user },
  allowedRoles
}) => {

  if (loading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Check if the user's role is allowed to access the current page
  if (user && allowedRoles.includes(user.role.toLowerCase())) {
    // Check if the user's status is active
    if (user.status && user.status.toLowerCase() === 'active') {
      return <AuthenticatedPage setTitle={setTitle} />;
    } else {
      // dispatch(setAlert('Your account is disabled. Please contact your administrator.', 'danger'));
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);