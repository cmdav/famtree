//Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authAction';
import { linksByRole } from "./LinksByRole";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
    const links = user ? linksByRole[user.role] : [];

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className='fas fa-code' /> FamTree
                </Link>
            </h1>
            {isAuthenticated && (
                <ul>
                    {links.map(link => (
                        <li key={link.to}>
                            {
                                !link.onClick && (
                                  <Link to={link.to}>
                                    {link.icon && <i className={link.icon} />}{' '}
                                    <span className='hide-sm'>{link.text}</span>
                                  </Link>
                                )
                            }

                            {link.onClick && (
                                <Link to={link.to} onClick={() => logout()}>
                                    {link.icon && <i className={link.icon} />}{' '}
                                    <span className='hide-sm'>{link.text}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { logout })(Navbar);