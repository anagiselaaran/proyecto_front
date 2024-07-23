import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  baseUrl = 'http://localhost:3000/api/times';
}
