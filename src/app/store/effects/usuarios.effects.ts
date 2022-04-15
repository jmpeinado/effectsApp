import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as usuariosActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {
   constructor( 
       private action$: Actions,
       private usuarioService: UsuarioService
   ){}

   cargarUsuario$ = createEffect(
       () => this.action$.pipe(
           ofType( usuariosActions.cargarUsuarios ),
           mergeMap(
               () => this.usuarioService.getUsers()
                   .pipe(
                       map( users => usuariosActions.cargarUsuariosSuccess({ usuarios:users }) ),
                       catchError( err => of( usuariosActions.cargarUsuariosError({ payload: err }) ) )
                    )
           )
       )
    );
}