import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunasService {
  private apiUrl = '/api';  // Cambia a /api

  constructor(private http: HttpClient) {}

  obtenerComunas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}