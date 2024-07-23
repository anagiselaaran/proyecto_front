import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { roleGuardGuard } from './guards/role-guard.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminPageComponent, canActivate: [authGuard, roleGuardGuard] },
    { path: "timer/:userId", component: TimerPageComponent, canActivate: [authGuard] },
    /*  { path: 'projects/:projectId', component: ,canActivate: [authGuard, roleGuardGuard]} para Cami*/
    { path: 'profile/:userId', component: ProfileComponent },
    { path: '**', redirectTo: '/login' }
];
//TODO: agregar guard auth en las rutas q faltan