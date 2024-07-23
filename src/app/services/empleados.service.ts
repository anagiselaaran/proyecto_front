import { Injectable, inject } from '@angular/core';
<<<<<<< HEAD

=======
>>>>>>> 705ba188fe880efc7a2166c9e700a660fe71f163
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../interfaces/empleado.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

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
      this.httpClient.post<ApiResponse>(this.baseUrl + '/login', body)
    );
  }
  create(body: Empleado): Promise<Empleado> {
    return firstValueFrom(
      this.httpClient.post<Empleado>(this.baseUrl + '/new', body)
    );

  }


  getAll(): Promise<Empleado[]> {
    return firstValueFrom(
      this.httpClient.get<Empleado[]>(this.baseUrl)

    );
  }
}
