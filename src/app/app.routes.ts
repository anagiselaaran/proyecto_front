import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { roleGuardGuard } from './guards/role-guard.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';

import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ControlHoursComponent } from './pages/control-hours/control-hours.component';
import { ProjectUsersComponent } from './pages/project-users/project-users.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },


    {
        path: 'admin', component: DashboardComponent, canActivate: [authGuard], children: [

            { path: 'profile', component: ProfileComponent },
            { path: 'panel', component: AdminPageComponent, canActivate: [roleGuardGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [roleGuardGuard] },
            { path: 'control_hours/:user_id', component: ControlHoursComponent },
            { path: "timer", component: TimerPageComponent },
            { path: 'proyectos', component: ProyectosComponent, canActivate: [roleGuardGuard] },
            { path: 'projects/:projectId', component: ProjectUsersComponent }
        ]
    },

    { path: '**', redirectTo: '/login' },

];


