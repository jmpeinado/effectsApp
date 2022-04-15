import { createReducer, on } from '@ngrx/store';
import * as usuariosActions from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuariosState {
    users: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuariosInitialState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

export const usuariosReducer = createReducer(usuariosInitialState,

    on(usuariosActions.cargarUsuarios, state => ({
         ...state, 
         loaded: false, 
         loading: true,
         error: null
    })),
    on(usuariosActions.cargarUsuariosSuccess, (state, { usuarios }) => ({
         ...state, 
         loaded: true,
         loading: false,
         error: null,
         users: [ ...usuarios ]
    })),
    on(usuariosActions.cargarUsuariosError, (state, { payload }) => ({
         ...state, 
         loaded: false,
         loading: false,
         error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
         }
    })),

);
