import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado, Password, UserProjects } from '../interfaces/empleado.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type LoginBody = { email: string; password: string };
type ApiResponse = { success: string; token?: string };

// TODO: Decide if interface should be here or in a separate file
export interface CustomPayload extends JwtPayload{
  userId: number,
  role: string,
  iat:number
}

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

  getProjectsByUserId(): Promise<UserProjects[]> {
    return firstValueFrom(
      this.httpClient.get<UserProjects[]>(this.baseUrl + '/projects')
    );
  }

  getAll(): Promise<Empleado[]> {
    return firstValueFrom(this.httpClient.get<Empleado[]>(this.baseUrl));
  }

  getById(userId: number): Promise<Empleado> {
    return firstValueFrom(
      this.httpClient.get<Empleado>(this.baseUrl + '/' + userId)
    );
  }

  //* Removed userId as parameter
  updatePassword(body: Password): Promise<any> {
    console.log(body);
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
