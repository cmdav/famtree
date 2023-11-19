// profileReducer.js

import { 
    UPDATE_PROFILE_SUCCESS, 
    UPDATE_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    PROFILE_LOADED_SUCCESS,
    PROFILE_LOADED_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
  userProfile: null,
    loading: true,
    isProfileUpdated: false,
    error: {}
};

function profileReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE_SUCCESS:
        case PROFILE_LOADED_SUCCESS:
        return {
            ...state,
            userProfile: payload,
            isProfileUpdated: false,
            loading: false
        };
        case GET_PROFILE_FAIL:
        case PROFILE_LOADED_FAIL:
        return {
            ...state,
            error: payload,
            loading: false
        };
        case UPDATE_PROFILE_SUCCESS:
        return {
            ...state,
            userProfile: payload,
            isProfileUpdated: true,
            loading: false
        };
        case UPDATE_PROFILE_FAIL:
        return {
            ...state,
            error: payload,
            loading: false
        };
        case LOGOUT:
            return {
                ...initialState,
            };
        default:
        return state;
    }
}

export default profileReducer;
