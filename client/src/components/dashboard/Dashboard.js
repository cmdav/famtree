//Dashboard.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProfile, plotFamilyTree } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  setTitle,
  userProfile,
  loadProfile,
  plotFamilyTree
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTitle('Dashboard'); // update the title when the component is mounted
    loadProfile();
    plotFamilyTree()
      .then(() => {
        // Introduce a 3-second delay using setTimeout
        setTimeout(() => {
          // Once the image is loaded and the delay is over, set isLoading to false
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error plotting family tree:', error);
        setIsLoading(false);
      });
  }, [setTitle, loadProfile, plotFamilyTree]);

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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="family-tree">
          <img
            src={`http://localhost:8081/${userProfile && userProfile.userId}.jpg?${Date.now()}`}
            alt="Family Tree"
          />
        </div>
      )}
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
