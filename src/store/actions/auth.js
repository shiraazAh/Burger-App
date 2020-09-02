import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: idToken,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
       dispatch(authStart());
       const authData = {
           email: email,
           password: password,
           returnSecureToken: true
       }

       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVK9UqEiyzUCaQ5fcBjQ2py-PzRS1TfKQ';

       if(!isSignUp) {
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVK9UqEiyzUCaQ5fcBjQ2py-PzRS1TfKQ';
        }

       Axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}