import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = "https://reqres.in/api";

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get<{data:Usuario[]}>( `${ this.baseUrl }/users` )
      .pipe(
        map( resp => resp.data)
      );
  }
}
