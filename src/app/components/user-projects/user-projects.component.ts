import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { UserProjects } from '../../interfaces/empleado.interface';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';

interface CustomPayload extends JwtPayload {
  userId: number,
  role: string,
  iat:number
}


@Component({
  selector: 'user-projects',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, UserProjectsComponent],
  templateUrl: './user-projects.component.html',
  styleUrl: './user-projects.component.css'
})
export class UserProjectsComponent {

  empleadosService = inject(EmpleadosService);
  proyectosService = inject(ProyectosService);
  activatedRoute = inject(ActivatedRoute);
  arrProyectos: UserProjects[] = [];
  contracted_hours: number = 0;
  userId: number = 0;
  weeklyHours: number = 0;

  
  async ngOnInit() {
    this.cargarProyectos();
    this.cargarUser();
  }
  
  async cargarUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const deco = jwtDecode<CustomPayload>(token);
      this.userId = deco.userId;
      if (!this.userId) {
        throw new Error('Invalid token: id not found');
      }
      //recogemos las horas almacenadas en la base de datos que ya han sido asignadas a proyectos esta semana
    const localArrHours = await JSON.parse(localStorage.getItem('weeklyHours') || '[]');
      this.weeklyHours = Number(localArrHours[1]);

      const user = await this.empleadosService.getById(this.userId);
      this.contracted_hours = user.contracted_hours;
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }
  
  async cargarProyectos(): Promise<void> {
    try {
      this.arrProyectos = await this.empleadosService.getProyectosPorUsuario();
    } catch (error: any) {
      console.error('Error al cargar los proyectos:', error);
    }
  }

}