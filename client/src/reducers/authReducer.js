//authReducer.js

import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isPasswordUpdated: null,
  loading: true,
  user: null
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isPasswordUpdated: false,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isPasswordUpdated: false,
        loading: true
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordUpdated: true,
        error: null
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isPasswordUpdated: false,
        error: payload
      };
      case AUTH_ERROR:
        case LOGOUT:
          // Reset the state to its initial state
          return {
            ...initialState,
            token: null
          };
    default:
      return state;
  }
}

export default authReducer;
