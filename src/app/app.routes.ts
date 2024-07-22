import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { roleGuardGuard } from './guards/role-guard.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component:AdminPageComponent, canActivate:[authGuard, roleGuardGuard]},
    { path: '**', redirectTo: '/login' },
];
//TODO: agregar guard auth en las rutas q faltan