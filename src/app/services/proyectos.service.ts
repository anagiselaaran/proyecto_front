import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor() { }

  private baseUrl = `${environment.apiUrl}/api/crearproyecto`;

  private httpClient = inject(HttpClient);

  createProyecto(nuevoProyecto: Proyecto): Promise<Proyecto> {
    return firstValueFrom(
      this.httpClient.post<Proyecto>(this.baseUrl, nuevoProyecto)
    );
  }

  getById(proyectoId: number): Promise<Proyecto> {
    return firstValueFrom(
      this.httpClient.get<Proyecto>(`${this.baseUrl}/${proyectoId}`)
    );
  }

    getAll(): Promise<Proyecto[]> {
    return firstValueFrom(
      this.httpClient.get<Proyecto[]>(this.baseUrl)
    )
  }
}
