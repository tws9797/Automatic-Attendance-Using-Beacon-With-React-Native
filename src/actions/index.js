import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GET_USER
} from './types.js';
import Firebase from '../Firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const emailChanged = (text) => {
  return {
      type: EMAIL_CHANGED,
      payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password, navigation }) => {
  //Action creator return a function
  //Redux thunk calls it with dispatch when a function is returned
  //Redux thunk dispatch an action to perform asynchronous process
  //Dispatch is a method
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, navigation))
      .catch(() => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user, navigation))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

export const getUserToken = (navigation) => {
  return (dispatch) =>
    Firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user){
        dispatch({
          type: GET_USER,
          payload: user
        });
        navigation.navigate('App');
      }
      else{
        navigation.navigate('Auth');
      }
    });
}

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
}

const loginUserSuccess = (dispatch, user, navigation) => {
  AsyncStorage.setItem('userToken', JSON.stringify(user))
    .then(() => dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    }));
  navigation.navigate('App');
};
