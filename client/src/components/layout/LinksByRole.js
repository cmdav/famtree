// LinksByRole.js

import { logout } from '../../actions/authAction';

export const linksByRole = {
    User: [
        { to: '/dashboard', text: 'Dashboard', icon: 'fas fa-chart-line', component: 'Dashboard' },
        { to: '/editprofile', text: 'Edit Profile', component: 'EditProfile' },
        { to: '/editpassword', text: 'Edit Password' },
        { to: '/logout', text: 'Logout', icon: 'fas fa-sign-out-alt', onClick: logout }
    ]
};

const allComponents = [
    ...linksByRole.User.map((link) => link.component),
  ];
  
  export const components = [...new Set(allComponents)].filter(Boolean);
