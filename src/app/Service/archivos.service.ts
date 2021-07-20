import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Archivos } from '../Modelo/archivos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  constructor(private http: HttpClient) { }
  Url = 'http://localhost:5000/delete'
  Url2 = 'http://localhost:5000/upload'
  Url3 = 'http://localhost:3000/archivo'

    enviarArchivo(body: FormData){
      return this.http.post<Archivos>(this.Url2,body );   
    }

    createLegajo(url: Archivos){
      return this.http.post<Archivos[]>(this.Url3+'/',url );   
    }
    getAllArchivos(id:number): Observable<Archivos[]> {
      return this.http.get<Archivos[]>(this.Url3+ '/'+id);
    }
    getArchivos(id:number): Observable<Archivos[]> {
      return this.http.get<Archivos[]>(this.Url3+ '/ar/'+id);
    }
    deleteArchivos(doce:string){
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          "path": doce
        },
      };
      return this.http.delete<Archivos>(this.Url ,options);
    }
    deleteArchivosTable(archi: Archivos){
      return this.http.delete<Archivos>(this.Url3 +'/'+archi.idarchivos);
    }
}