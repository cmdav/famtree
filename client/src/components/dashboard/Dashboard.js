//Dashboard.js

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loadProfile} from '../../actions/profileAction';

const Dashboard = ({
  setTitle,
  userProfile,
  loadProfile,
}) => {
  useEffect(() => {
    setTitle('Dashboard'); // update the title when the component is mounted
    loadProfile();
  }, [setTitle, loadProfile]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {userProfile && userProfile.firstName}
      </p>
      
    </section>
  );
};

Dashboard.propTypes = {
  userProfile: PropTypes.object,
  loadProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.profileReducer.userProfile,
});

export default connect(mapStateToProps, {loadProfile  })(
  Dashboard
);
