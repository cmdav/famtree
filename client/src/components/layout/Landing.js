import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">FamTree</h1>
          <p className="lead">
            Discover the branches of your heritage with FamTree.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-light">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
