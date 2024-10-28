import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCliente {
  private jsonUrl = '../data/datos-equipos.json';

  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
