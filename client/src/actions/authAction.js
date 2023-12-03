//authAction.js

import api from '../utils/api';
import { setAlert } from './alertAction';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAIL
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/profiles');
    
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    // dispatch(loadProfile());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
     const res = await api.post('/auth/register', formData);
     const {message} = res.data;
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    if(message) {
      dispatch(setAlert(message, 'success'));
    }
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Add Family Member
export const addMember = (formData) => async (dispatch) => {
  try {
     const res = await api.post('/auth/addmember', formData);
    
    dispatch({
      type: ADD_MEMBER_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Family member added successfully', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_MEMBER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post('/auth', body);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Edit password
export const updatePassword = (id, formData) => async (dispatch) => {
console.log("updatePassword");
console.log("id: " + id);
console.log("formData: " + JSON.stringify(formData));
  try {
    const res = await api.put(`/auth/${id}/editpassword`, formData);
    
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('Password updated successfully', 'success'));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_PASSWORD_FAIL
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
