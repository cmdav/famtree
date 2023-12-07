// profileAction.js

import api from '../utils/api';
import { setAlert } from './alertAction';
import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  PROFILE_LOADED_SUCCESS,
  PROFILE_LOADED_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  PLOT_FAMILY_TREE_SUCCESS,
  PLOT_FAMILY_TREE_FAIL
} from './types';

// Load User
export const loadProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profiles');

    dispatch({
      type: PROFILE_LOADED_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_LOADED_FAIL
    });
  }
};

// Plot Family Tree
export const plotFamilyTree = () => async (dispatch) => {
  try {
    const res = await api.get('/profiles/plotGraph');

    dispatch({
      type: PLOT_FAMILY_TREE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLOT_FAMILY_TREE_FAIL
    });
  }
};

// Get current user profile
export const getProfile = () => async (dispatch, getState) => {
  try {
    // Return profileReducer.userProfile if the id matches in res.data
    const res = getState().profileReducer.userProfile;

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res
    });

    return res.data;
  }

  catch (err) {
    dispatch({
      type: GET_PROFILE_FAIL
    });
  }

};

// Update Profile
export const editProfile = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/profiles/${id}`, formData);
    dispatch(setAlert('Profile Updated', 'success'));
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data
    });
    dispatch(loadProfile());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: UPDATE_PROFILE_FAIL
    });
  }
};