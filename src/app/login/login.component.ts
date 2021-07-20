import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Modelo/user';
import { Usuario } from '../Modelo/usuario';
import { CargarScriptService } from '../Service/cargar-script.service';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = new Usuario();
  user!: User;
  constructor (private _CargaScripts: CargarScriptService,private authService: AuthService, private router: Router) { _CargaScripts.Carga(["main"]); }

  ngOnInit(): void {
  }
  signIn() {
    this.authService.signIn(this.usuario).subscribe(
      res => {
        sessionStorage.setItem('token', res.accessToken);
        let datos = JSON.parse(atob(res.accessToken.split(".")[1]));
        this.user = new User();
        this.user.idpersona = datos.usuario.idpersona;
        this.user.pernom = datos.usuario.pernom;
        this.user.perape = datos.usuario.perape;
        this.user.username = datos.usuario.username;
        this.user.idusuario = datos.usuario.idusuario;
        sessionStorage.setItem('usuarios', JSON.stringify(this.user));
        this.router.navigate(['/home']);
        console.log("bienvenido")
        console.log(this.user);
      },
      err =>{
        console.log("error");
      }
    )
  }

  public get usuarios(): User {
    if (this.user != null) {
      return this.user;
    } else if (this.user == null && sessionStorage.getItem("usuarios") != null) {
      this.user == JSON.parse(sessionStorage.getItem('usuarios') || '{}') as User;
      return this.user;
    }
    return new User();
  }
}
