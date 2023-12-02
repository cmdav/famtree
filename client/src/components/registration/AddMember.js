// AddMember.js is a component that allows a user to add  member to the database.
// It is imported by App.js and is rendered by the Route path="/addmember" component={AddMember}
// Component will have firstname, lastname, middleName, email, phone, birthdate, street, city, state, postalCode, country, profilepic url.

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { addMember } from '../../actions/authAction';
import PropTypes from 'prop-types';
import { validateProfileForm } from '../../utils/formvalidation';

const AddMember = ({ setTitle, addMember, isMemberAdded }) => {
    useEffect(() => {
        setTitle('Add Member'); // update the title when the component is mounted
    }, [setTitle]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        relationship: '',
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

    const [errors, setErrors] = useState({});

    const { firstName, lastName, middleName, relationship, email, phone, street, city, state, postalCode, country, birthDate, profilePic } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        // Validate profile data using formvalidation.js
        // setErrors({});
        const validationErrors = validateProfileForm(formData, 'add');

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateProfileForm(formData, 'add');

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        addMember(formData);
    };

    if (isMemberAdded) {
          return <Navigate to="/dashboard" />;
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Add Member</h1>
            <p className="lead">
                <i className="fas fa-user-cog" /> Add Family Member
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        title='First Name'
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                </div>
                {/* Add error messages for other fields */}
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Middle Name"
                        name="middleName"
                        value={middleName}
                        title='Other Name'
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
                        title='Last Name'
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        title='Email Address'
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                {/* Relationship dropdow with values Father, Mother, Brother, Sister, Uncle, Aunt, Son, Daughter, Grand Father, Grand Mother*/}
                <div className="form-group">
                    <select
                        name="relationship"
                        value={relationship}
                        title='Relationship'
                        onChange={onChange}
                        onKeyDown={onChange}
                    >
                        <option value="0">* Select Relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Uncle">Uncle</option>
                        <option value="Aunt">Aunt</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Grand Father">Grand Father</option>
                        <option value="Grand Mother">Grand Mother</option>
                    </select>
                    {errors.relationship && <p className="text-danger">{errors.relationship}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={phone}
                        title='Phone Number'
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
                        title='Street'
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {errors.street && <p className="text-danger">{errors.street}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={city}
                        title='City'
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
                        title='State'
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
                        title='Postal Code'
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
                        title='Country'
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {errors.country && <p className="text-danger">{errors.country}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        placeholder="Birth Date"
                        name="birthDate"
                        value={birthDate}
                        title='Birth Date (mm/dd/yyyy)'
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {errors.birthDate && <p className="text-danger">{errors.birthDate}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        name="profilePic"
                        title='Profile Picture'
                        onChange={onChange}
                        onKeyDown={onChange}
                    />
                    {errors.profilePic && <p className="text-danger">{errors.profilePic}</p>}
                </div>
                <input type="submit" className="btn btn-primary" value="Add" />
                <Link className="btn btn-danger" to="/">
                    Cancel
                </Link>
            </form>
        </section>
    );
};

AddMember.propTypes = {
    addMember: PropTypes.func.isRequired,
    isMemberAdded: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isMemberAdded: state.authReducer.isMemberAdded
});

export default connect(mapStateToProps, { addMember })(AddMember);

