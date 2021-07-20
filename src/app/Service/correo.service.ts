import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Correo } from '../Modelo/correo';


@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }

  Url = 'http://localhost:3000/correo'
  createCorreo(docente:Correo){
    return this.http.post<Correo[]>(this.Url+'/email', docente);   
  }
  
  getAllCorreo(id: number): Observable<Correo[]> {
    return this.http.get<Correo[]>(this.Url+ '/'+id);
  }
}
