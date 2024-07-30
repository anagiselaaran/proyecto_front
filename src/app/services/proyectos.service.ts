import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProjectTime, Proyecto } from '../interfaces/proyecto.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
 

  constructor() { }

  private baseUrl = `${environment.apiUrl}/api/projects`;

  private httpClient = inject(HttpClient);

  createProyecto(body: Proyecto): Promise<Proyecto> {
    return firstValueFrom(
      this.httpClient.post<Proyecto>(`${this.baseUrl}/new`, body)
    );
  }

  getById(proyectoId: number): Promise<Proyecto> {
    return firstValueFrom(
      this.httpClient.get<Proyecto>(`${this.baseUrl}/${proyectoId}`)
    );
  }

  getAll(): Promise<Proyecto[]> {
    return firstValueFrom(this.httpClient.get<Proyecto[]>(this.baseUrl));
  }

  getByDepartment(dep: string): Promise<Proyecto[]> {
    return firstValueFrom(
      this.httpClient.get<Proyecto[]>(`${this.baseUrl}/department/` + dep)
    )
  }

  // TIMER PAGE FILTERS
  getByUserIdAndActive(active: number): Promise<Proyecto[]> {
    return firstValueFrom(
      this.httpClient.get<Proyecto[]>(`${this.baseUrl}/user/active/${active}`)
    );
  }

  getByUserIdAndDepartment(dep: string): Promise<Proyecto[]> {
    return firstValueFrom(
      this.httpClient.get<Proyecto[]>(`${this.baseUrl}/user/department/${dep}`)
    );
  }

  getByProjectId(body: { projectId: number }): Promise<ProjectTime[]> {
    return firstValueFrom(
      this.httpClient.post<ProjectTime[]>(`${this.baseUrl}/user/projects`, body)
    );
  }
}
