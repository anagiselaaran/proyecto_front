import { Injectable, inject } from '@angular/core';
import { Empleado, Password, UserProjects } from '../interfaces/empleado.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../interfaces/jwtPayload.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proyecto } from '../interfaces/proyecto.interface';
type LoginBody = { email: string; password: string };
type ApiResponse = { success: string; token?: string };

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
 
  private baseUrl: string = `${environment.apiUrl}/api/users`;

  private httpClient = inject(HttpClient);

  login(body: LoginBody): Promise<ApiResponse> {
    return firstValueFrom(
      this.httpClient.post<ApiResponse>(this.baseUrl + '/login', body)
    );
  }
  create(body: Empleado): Promise<Empleado> {
    console.log(body);

    return firstValueFrom(
      this.httpClient.post<Empleado>(this.baseUrl + '/new', body)
    );
  }

  getUsersByProject(projectId: number): Promise<Empleado[]> {
    return firstValueFrom(
      this.httpClient.get<Empleado[]>(this.baseUrl + '/project_user' + '/' + projectId)
    );
  }

  getProjectsByUserId(): Promise<UserProjects[]> {
    return firstValueFrom(
      this.httpClient.get<UserProjects[]>(this.baseUrl + '/projects')
    );
  }
  getProyectosPorUsuario(): Promise<UserProjects[]> {
    return firstValueFrom(
      this.httpClient.get<UserProjects[]>(`${this.baseUrl}/projects`)
    )
  }
//revisar
  getWeeklyHours(body:any): Promise<any>{
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/weeklyHours`, body)
      )
  }

  getAll(): Promise<Empleado[]> {
    return firstValueFrom(this.httpClient.get<Empleado[]>(this.baseUrl));
  }

  getById(userId: number): Promise<Empleado> {
    return firstValueFrom(
      this.httpClient.get<Empleado>(this.baseUrl + '/' + userId)
    );
  }
  
  asignHoursToProjects(body:any): Promise<any> {
    return firstValueFrom(
      this.httpClient.put<any>(`${this.baseUrl}/edit/hoursProjects`, body)
    );
  }

  getByName(name: string): Promise<Empleado[]>{
    return firstValueFrom(
      this.httpClient.get<Empleado[]>(this.baseUrl + '/name/' + name)
    )
  }

  /* updatePassword(userId: number, body: Password): Promise<any> {
    console.log(body)
    return firstValueFrom(
      this.httpClient.get<Empleado[]>(this.baseUrl + '/project_user' + '/' + projectId)
    );
  } */


  updatePassword(body: Password): Promise<any> {
    return firstValueFrom(
      this.httpClient.put<any>(this.baseUrl + '/profile/edit', body)
    );
  }

  getTokenData() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token');
    }
    return jwtDecode<CustomPayload>(token);
  }
 
}
export { CustomPayload };

