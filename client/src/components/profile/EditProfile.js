// EditProfile.js component is used to edit the profile of the user
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getProfile, editProfile } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import { validateProfileForm } from '../../utils/formvalidation';

const EditProfile = ({ setTitle, getProfile, editProfile, userProfile, isProfileUpdated }) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    birthDate: '',
    profilePic: ''
  });

  useEffect(() => {
    setTitle('Edit Profile');
    getProfile();
  }, [setTitle, getProfile]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        middleName: userProfile.middleName,
        email: userProfile.email,
        phone: userProfile.phone,
        street: userProfile.street,
        city: userProfile.city,
        state: userProfile.state,
        postalCode: userProfile.postalCode,
        country: userProfile.country,
        birthDate: userProfile.birthDate,
        profilePic: userProfile.profilePic
      });
    }
  }, [userProfile]);

  const [errors, setErrors] = useState({});

  const {
    firstName,
    lastName,
    middleName,
    email,
    phone,
    street,
    city,
    state,
    postalCode,
    country,
    birthDate,
    profilePic
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const validationErrors = validateProfileForm(formData, 'edit');

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProfileForm(formData, 'edit');

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    
    editProfile(userProfile._id, formData);
  };

  if (isProfileUpdated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Edit Profile</h1>
      <p className="lead">
        <i className="fas fa-user-edit" /> Edit Your Profile
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            title="First Name"
            onChange={onChange}
          />
          {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
        </div>
        <div className="form-group">
            <input
                type="text"
                placeholder="Middle Name"
                name="middleName"
                value={middleName}
                title="Other Name"
                onChange={onChange}
                onKeyDown={onChange}
            />
            {errors.middleName && <p className="text-danger">{errors.middleName}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            title="Last Name"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
        </div>
        {/* Add form inputs for other fields */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            title="Email Address"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            title="Phone Number"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.phone && <p className="text-danger">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={street}
            title="Street"
            onChange={onChange}
          />
          {errors.street && <p className="text-danger">{errors.street}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city}
            title="City"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.city && <p className="text-danger">{errors.city}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="State"
            name="state"
            value={state}
            title="State"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.state && <p className="text-danger">{errors.state}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            value={postalCode}
            title="Postal Code"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.postalCode && <p className="text-danger">{errors.postalCode}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            title="Country"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.country && <p className="text-danger">{errors.country}</p>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Birth Date"
            name="birthDate"
            value={birthDate}
            title="Birth Date"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.birthDate && <p className="text-danger">{errors.birthDate}</p>}
        </div>
        <div className="form-group">
          <input
            type="file"
            name="profilePic"
            title="Profile Picture"
            onChange={onChange}
            onKeyDown={onChange}
          />
          {errors.profilePic && <p className="text-danger">{errors.profilePic}</p>}
        </div>
        <input type="submit" className="btn btn-primary" value="Save Changes" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

EditProfile.propTypes = {
  setTitle: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  isProfileUpdated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  userProfile: state.profileReducer.userProfile,
  isProfileUpdated: state.profileReducer.isProfileUpdated
});

export default connect(mapStateToProps, { getProfile, editProfile })(EditProfile);