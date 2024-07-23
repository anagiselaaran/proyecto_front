import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { roleGuardGuard } from './guards/role-guard.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ControlHoursComponent } from './pages/control-hours/control-hours.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminPageComponent, canActivate: [authGuard, roleGuardGuard] },
    { path: 'control_hours/:user_id', component: ControlHoursComponent},
    /*  { path: 'projects/:projectId', component: ,canActivate: [authGuard, roleGuardGuard]} para Cami*/
    { path: '**', redirectTo: '/login' },
];
//TODO: agregar guard auth en las rutas q faltan