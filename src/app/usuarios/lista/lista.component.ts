import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any = null;
  

  constructor( 
    // private userService: UsuarioService
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    // this.userService.getUsers()
    //   .subscribe( usuarios => this.usuarios = usuarios);

    // LO HACEMOS A TRAVES DEL EFFECTS
    // Escuchamos los cambios
    this.store.select('usuarios')
      .subscribe( ({ users, loading, error }) => {
        this.usuarios = users;
        this.loading = loading;
        this.error = error;
      });

    // Lanzamos la accion
    this.store.dispatch( cargarUsuarios() );
  }

}
