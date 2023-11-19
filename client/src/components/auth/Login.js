import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authAction';

const Login = ({ login, isAuthenticated, setTitle }) => {
    useEffect(() => {
        setTitle('Login'); // update the title when the component is mounted
    }, [setTitle]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user" /> Sign Into Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </section>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);