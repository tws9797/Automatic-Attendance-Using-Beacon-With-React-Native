import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GET_TOKEN
 } from '../actions/types';

const INITIAL_STATE = {
  email: 'test@test.com',
  password: 'password',
  user: null,
  error: ' ', //To create an invisible row
  loading: false,
  token: {}
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      //Make a new object that consist of the existing state's property
      //Throw property email on top of the existing state
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, token: JSON.stringify(action.payload) };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: ' ' };
    case GET_TOKEN:
      return { ...state, token: action.payload }
    default:
      return state;
  }
};
