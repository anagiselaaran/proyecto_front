import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { roleGuardGuard } from './guards/role-guard.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ControlHoursComponent } from './pages/control-hours/control-hours.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';

import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProjectUsersComponent } from './pages/project-users/project-users.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminPageComponent, canActivate: [authGuard, roleGuardGuard] },
<<<<<<< HEAD
    {
        path: 'projects/:projectId', component: ProjectUsersComponent /*canActivate: [authGuard, roleGuardGuard] },*/
    },
    { path: '**', redirectTo: '/login' },
    { path: "timer", component: TimerPageComponent },
=======
    { path: 'control_hours/:user_id', component: ControlHoursComponent},
    { path: "timer", component: TimerPageComponent, canActivate: [authGuard] },
    /*  { path: 'projects/:projectId', component: ,canActivate: [authGuard, roleGuardGuard]} para Cami*/
>>>>>>> bc22716b3fec73a36c05856cb8fd243d63e43d00
    { path: 'profile/:userId', component: ProfileComponent },
    { path: 'projects', component: ProyectosComponent },
    { path: '**', redirectTo: '/login' }
<<<<<<< HEAD

=======
>>>>>>> bc22716b3fec73a36c05856cb8fd243d63e43d00
];

//TODO: agregar guard auth en las rutas q faltan//