import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Time } from '../interfaces/time.interface';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private httpClient = inject(HttpClient);

  private baseUrl = `${environment.apiUrl}/api/work-hours`;

  getAll(): Promise<Time[]> {
    return firstValueFrom(this.httpClient.get<Time[]>(this.baseUrl));
  }

  getByUserId(userId: number): Promise<Time[]> {
    return firstValueFrom(
      this.httpClient.get<Time[]>(`${this.baseUrl}/user/${userId}`)
    );
  }

  getByDate(date: string): Promise<Time[]> {
    return firstValueFrom(
      this.httpClient.get<Time[]>(`${this.baseUrl}/date/${date}`)
    );
  }

  getByUserIdAndDate(userId: number, date: string): Promise<Time[]> {
    return firstValueFrom(
      this.httpClient.get<Time[]>(`${this.baseUrl}/user/${userId}/date/${date}`)
    );
  }

  getByPeriod(start: string, end: string): Promise<Time[]> {
    return firstValueFrom(
      this.httpClient.get<Time[]>(`${this.baseUrl}/start/${start}/end/${end}`)
    );
  }

  getByUserIdAndPeriod(
    userId: number,
    start: string,
    end: string
  ): Promise<Time[]> {
    return firstValueFrom(
      this.httpClient.get<Time[]>(
        `${this.baseUrl}/user/${userId}/start/${start}/end/${end}`
      )
    );
  }

  createTime(body: any): Promise<Time> {
    return firstValueFrom(
      this.httpClient.post<Time>(`${this.baseUrl}/new`, body)
    );
  }

  createProjectTime(body: any): Promise<Time> {
    return firstValueFrom(
      this.httpClient.post<Time>(`${this.baseUrl}/project/new`, body)
    );
  }
  
  updateByUserIdAndDate(userId: number, body: any): Promise<Time> {
    return firstValueFrom(
      this.httpClient.put<Time>(`${this.baseUrl}/user/${userId}`, body)
    );
  }

  deleteByUserIdAndDate(userId: number, date: string): Promise<Time> {
    return firstValueFrom(
      this.httpClient.delete<Time>(
        `${this.baseUrl}/user/${userId}/date/${date}`
      )
    );
  }
}
