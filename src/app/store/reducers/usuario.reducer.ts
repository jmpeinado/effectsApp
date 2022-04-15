import { createReducer, on } from '@ngrx/store';
import * as usuariosActions from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuarioState {
    id: number,
    user: Usuario,
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuarioInitialState: UsuarioState = {
    id: 0,
    user: new Usuario(0, '', '', '', ''),
    loaded: false,
    loading: false,
    error: null
}

export const usuarioReducer = createReducer(usuarioInitialState,

    on(usuariosActions.cargarUsuario, (state, { id }) => ({
         ...state, 
         loaded: false, 
         loading: true,
         error: null,
         id: id
    })),
    on(usuariosActions.cargarUsuarioSuccess, (state, { usuario }) => ({
         ...state, 
         loaded: true,
         loading: false,
         error: null,
         user: { ...usuario }
    })),
    on(usuariosActions.cargarUsuarioError, (state, { payload }) => ({
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
