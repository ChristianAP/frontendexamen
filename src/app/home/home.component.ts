import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string = `${window.sessionStorage.getItem('usuarios')}`;
  idusuario!: number;
  username!: string;
  pernom!: string;
  perape!: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    let arrDocente = JSON.parse(this.user);
    this.idusuario = arrDocente["idusuario"];
    this.username = arrDocente["username"];
    this.pernom = arrDocente["pernom"];
    this.perape = arrDocente["perape"];
  }
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuarios');
    this.router.navigate(['/login']);
  }
}
