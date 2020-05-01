import { SET_GROUPS, SET_ERRORS, SET_GROUP_UPDATED } from './types';
import axios from 'axios';

export const getUserGroups = (userId) => async (dispatch) => {
  axios
    .get('/api/groups', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then((response) => {
      return dispatch({ type: SET_GROUPS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    });
};

export const setGroupUpdated = (bool) => (dispatch) => {
  dispatch({ type: SET_GROUP_UPDATED, payload: bool });
};
