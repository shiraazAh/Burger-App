import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
                token: null,
                userId: null,
                error: null,
                loading: false,
                setAuth: '/'
            }  
        )
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            setAuth: '/'
        } , {
            type: actionTypes.AUTH_SUCCESS,
            userId: 'some-id' ,
            idToken: 'some-token'
        })).toEqual({
                token: 'some-token',
                userId: 'some-id',
                error: null,
                loading: false,
                setAuth: '/'
            }  
        )
    });
})