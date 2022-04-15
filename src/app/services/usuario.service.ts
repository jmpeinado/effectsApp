import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = "https://reqres.in/api";

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get<{data:Usuario[]}>( `${ this.baseUrl }/users?delay=3` )
      .pipe(
        map( resp => resp.data)
      );
  }

  getUser( id: number ) {
    return this.http.get<{data:Usuario}>( `${ this.baseUrl }/users/${ id }?delay=1` )
      .pipe(
        map( resp => resp.data)
      );
  }
}
