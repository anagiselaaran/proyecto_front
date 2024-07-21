import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../interfaces/empleado.interface';
import { firstValueFrom } from 'rxjs';

type LoginBody = { email: string, password: string };
type ApiResponse = { success: string, token?: string };


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private baseUrl = `${environment.apiUrl}/api/users`;
  private httpClient = inject(HttpClient);


  login(body: LoginBody): Promise<ApiResponse> {
    return firstValueFrom(
      this.httpClient.post<ApiResponse>(this.baseUrl + 'login', body)
    );
  }

 

  getAll(): Promise<Empleado[]> {
    return firstValueFrom(
      this.httpClient.get<Empleado[]>(this.baseUrl)
     
    );
  }
}
