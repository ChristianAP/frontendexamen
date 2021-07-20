import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Archivos } from '../Modelo/archivos';
import { ArchivosService } from '../Service/archivos.service';
import { CargarScriptService } from '../Service/cargar-script.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  user: string = `${window.sessionStorage.getItem('usuarios')}`;
  idusuario!: number;
  public archivos : any = [];
  public archivos2 : any = [];
  legajitos : Archivos[] = [];
  listarArchivos : Archivos []  = [];
  listarIDArchivos : Archivos []  = [];
  constructor(private sanitizer: DomSanitizer,private ArchivosService:ArchivosService, private router: Router, private _CargaScripts: CargarScriptService) {_CargaScripts.Carga(["imga"]); }

  ngOnInit(): void {
    let arrDocente = JSON.parse(this.user);
    this.idusuario = arrDocente["idusuario"];
    this.getAllArchivos();
  }
  capturar(e:any) {
    this.archivos.pop();
    const capturados = e.target.files[0]
    this.archivos.push(capturados)
  }

  subirArchivos() : any{
    try {
      const formData = new FormData();
      this.archivos.forEach((archivo: string) => {
        formData.append('file', archivo)
      })
      this.ArchivosService.enviarArchivo(formData).subscribe(res => {
        this.legajitos.push(res);
        console.log(this.legajitos);
         this.crearLegajo();
        });
    } catch (e) {
      console.log('ERROR', e);

    }
  }
  crearLegajo(){
      this.legajitos[0].idusuario = this.idusuario;
    this.ArchivosService.createLegajo(this.legajitos[0]).subscribe(data=>{
      console.log("GUARDADO")
         this.ngOnInit();
         this.legajitos.pop();
         (<HTMLInputElement>document.getElementById("vistaPrevia")).value=' ';
    })
  }

  ////////////////////////// LISTAR ARCHIVOS //////////////////////////

  getAllArchivos() {
    this.ArchivosService.getAllArchivos(this.idusuario).subscribe(
      (data) => {
        this.listarArchivos = data;
        console.log(this.listarArchivos);
      }
    );
  }
  eliminar(prueb:Archivos){
        console.log(prueb);
        this.ArchivosService.deleteArchivos(prueb.path).subscribe(data=>{
          this.listarArchivos=this.listarArchivos.filter(r=>r!==prueb);
          this.ngOnInit();
        });

        this.ArchivosService.deleteArchivosTable(prueb).subscribe(data=>{
          this.listarArchivos=this.listarArchivos.filter(r=>r!==prueb);
          this.ngOnInit();
        });
      }
      
loadArchi(pru: Archivos){
  this.ArchivosService.getArchivos(pru.idarchivos).subscribe((data) => {
    this.listarIDArchivos = data;
    console.log(this.listarIDArchivos);
    })
  }
  transform(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
