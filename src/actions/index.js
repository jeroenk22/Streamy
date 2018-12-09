import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';

export const signIn = (userId, userName) => {
  return {
    type: SIGN_IN,
    payload: { userId, userName }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

// Create Stream
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });

  // Navigate user back to root route "/" (Programmatic navigation)
  history.push('/');
};

// Fetch Streams
export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// Fetch Stream
export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// Edit Stream
export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });

  // Navigate user back to root route "/" (Programmatic navigation)
  history.push('/');
};

// Delete Stream
export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  // Navigate user back to root route "/" (Programmatic navigation)
  history.push('/');
};
