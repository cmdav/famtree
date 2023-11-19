//Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authAction';
import { linksByRole } from "./LinksByRole";

const Navbar = ({ auth: { isAuthenticated, user }, logout, profileId }) => {
    // const links = user ? linksByRole[user.role] : []; // commenting the line as we only have one role
    const links = linksByRole['User'];

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
                                // Check if the link.to has 'editprofile' in it then add the profileId to the link
                                !link.onClick && (
                                  <Link to={link.text === 'Edit Profile' ? `${link.to}/${profileId}` : link.to}>
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
    profileId: PropTypes.string
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    profileId: state.profileReducer.userProfile ? state.profileReducer.userProfile._id : null,
});

export default connect(mapStateToProps, { logout })(Navbar);