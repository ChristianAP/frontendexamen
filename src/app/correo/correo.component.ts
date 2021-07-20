import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Correo } from '../Modelo/correo';
import { CorreoService } from '../Service/correo.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {
  user: string = `${window.sessionStorage.getItem('usuarios')}`;
  idusuario!: number;
  correo: Correo = new Correo();
  listarCorreo: Correo [] = [];
  constructor(private correoService: CorreoService, private router: Router ) { }

  ngOnInit(): void {
    let arrDocente = JSON.parse(this.user);
    this.idusuario = arrDocente["idusuario"];
    this.getCorreo();
  }
  crearEmail(){
    this.correo.idusuario = this.idusuario;
    this.correoService.createCorreo(this.correo).subscribe(data=>{
         this.ngOnInit();
         (<HTMLInputElement>document.getElementById("input")).value=' ';
         (<HTMLInputElement>document.getElementById("input2")).value=' ';
         (<HTMLInputElement>document.getElementById("input3")).value=' ';
    })
  }
  getCorreo(){
    this.correoService.getAllCorreo(this.idusuario).subscribe(
      (data) => {
        this.listarCorreo = data;
        console.log(this.listarCorreo);
      }
    )};
}
