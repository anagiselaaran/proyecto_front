import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'time-tracker', component: TimerPageComponent },
  { path: '**', redirectTo: '/login' },
];
