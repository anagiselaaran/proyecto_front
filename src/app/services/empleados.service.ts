import { Injectable, inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../interfaces/empleado.interface';
import { firstValueFrom } from 'rxjs';

type LoginBody = { email: string, password: string };
type ApiResponse = { success: string, token?: string };


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private baseUrl: string = `http://localhost:3000/empleados`;

  private httpClient = inject(HttpClient);


  login(body: LoginBody): Promise<ApiResponse> {
    return firstValueFrom(
      this.httpClient.post<ApiResponse>(this.baseUrl + 'login', body)
    );
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('crmtoken')!
      })
    }
  }
  getAll(): Promise<Empleado[]> {
    return firstValueFrom(
      this.httpClient.get<Empleado[]>(this.baseUrl, this.createHeaders())
    );
  }
}
