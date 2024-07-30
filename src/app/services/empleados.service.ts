import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado, Password, UserProjects } from '../interfaces/empleado.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
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
    return firstValueFrom(
      this.httpClient.post<Empleado>(this.baseUrl + '/new', body)
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

  updatePassword(userId: number, body: Password): Promise<any> {
    console.log(body)
    return firstValueFrom(
      this.httpClient.put<any>(this.baseUrl + '/profile/edit/' + userId, body)
      );
  }
 
}
