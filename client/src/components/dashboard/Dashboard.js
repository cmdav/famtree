//Dashboard.js

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProfile, plotFamilyTree } from '../../actions/profileAction';

const Dashboard = ({
  setTitle,
  userProfile,
  loadProfile,
  plotFamilyTree
}) => {
  useEffect(() => {
    setTitle('Dashboard'); // update the title when the component is mounted
    loadProfile();
  }, [setTitle, loadProfile]);

  // Add delay to load family tree image
  useEffect(() => {
    const timer = setTimeout(() => {
      plotFamilyTree();
    }, 3000);
    return () => clearTimeout(timer);
  }, [plotFamilyTree]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {userProfile && userProfile.firstName}
      </p>

      {/* 
        Display family tree graph. Fetch graph from http://localhost:8081/userid.jpg
        where userid is userProfile.userId
      */}
      <div className="family-tree">
        <img
          src={`http://localhost:8081/${userProfile && userProfile.userId}.jpg`}
          alt="Family Tree"
        />
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  userProfile: PropTypes.object,
  loadProfile: PropTypes.func.isRequired,
  plotFamilyTree: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userProfile: state.profileReducer.userProfile,
});

export default connect(mapStateToProps, { loadProfile, plotFamilyTree })(
  Dashboard
);
