import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/login' },
    { path: 'proyectos', component: ProyectosComponent }
];
