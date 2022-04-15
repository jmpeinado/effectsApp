import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as usuarioActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
   constructor( 
       private action$: Actions,
       private usuarioService: UsuarioService
   ){}

   cargarUsuario$ = createEffect(
       () => this.action$.pipe(
           ofType( usuarioActions.cargarUsuario ),
           mergeMap(
               (action) => this.usuarioService.getUser( action.id )
                   .pipe(
                       map( user => usuarioActions.cargarUsuarioSuccess({ usuario: user }) ),
                       catchError( err => of( usuarioActions.cargarUsuarioError({ payload: err }) ) )
                    )
           )
       )
    );
}