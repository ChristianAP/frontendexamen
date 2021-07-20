import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Usuario } from '../Modelo/usuario';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../Modelo/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api/auth/'
  private Url = 'http://localhost:3000/usuario'
  constructor(private http: HttpClient, private router: Router) { }

  private usuario! : User;

  signIn(usuario:Usuario) {
    
    return this.http.post<any>(this.url, usuario);
  }

  //Crear Usuario
  createUsuario(user:Usuario){
    return this.http.post<Usuario[]>(this.Url+'/create', user);   
  }

  datauser(usuario:Usuario) {
    
    return this.http.post<Usuario>(this.url, usuario);
  }


  loggedIn(){
    return !!sessionStorage.getItem('token');
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  getdataUser(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.Url+'/');
  }

  public get users() :User{
    if(this.usuario!=null){
         return this.usuario;
    }else if (this.usuario == null && sessionStorage.getItem("usuario")!=null) {
      this.usuario == JSON.parse(sessionStorage.getItem('usuario') || '{}') as User;
      return this.usuario;
    }
    return new User();
  }

}
