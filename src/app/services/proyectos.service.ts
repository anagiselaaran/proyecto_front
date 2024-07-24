import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {



  private baseUrl = `${environment.apiUrl}/api/projects`;


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
  
  getByDepartment(dep:string): Promise<Proyecto[]> {
    return firstValueFrom(
      this.httpClient.get<Proyecto[]>(`${this.baseUrl}/department/`+ dep)
    )
  }
}
