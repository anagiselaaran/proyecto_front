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

  private baseUrl: string = `${environment.apiUrl}/empleados`;

  private httpClient = inject(HttpClient);


  login(body: LoginBody): Promise<ApiResponse> {
    return firstValueFrom(
      this.httpClient.post<ApiResponse>(this.baseUrl + 'login', body)
    );
  }
  create(body: Empleado): Promise<Empleado> {
    return firstValueFrom(
      this.httpClient.post<Empleado>(this.baseUrl, body, this.createHeaders())
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
