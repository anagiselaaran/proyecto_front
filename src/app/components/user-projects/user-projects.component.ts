import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { UserProjects } from '../../interfaces/empleado.interface';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'user-projects',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './user-projects.component.html',
  styleUrl: './user-projects.component.css'
})
export class UserProjectsComponent {

  empleadosService = inject(EmpleadosService);
  proyectosService = inject(ProyectosService)
  activatedRoute = inject(ActivatedRoute);
  arrProyectos: UserProjects[] = [];
  horasProyecto: number = 0;

  formHoras: FormGroup = new FormGroup({
    hours: new FormControl()
  });

  
  async ngOnInit() {
    this.cargarProyectos();
    const response = await this.
  }

  async cargarProyectos():Promise<void> {
    try {
      this.arrProyectos = await this.empleadosService.getProyectosPorUsuario();
    } catch (error: any) {
      console.error('Error al cargar los proyectos:', error);
    }
  }
  async onSubmit() {
    const proyecto = this.arrProyectos[0]
    const horas = Number(this.formHoras.value.hours);
    const body = {projectId:proyecto.id, hours: horas}
    const response = await this.empleadosService.asignHoursToProjects(body);
    console.log(response)
    this.horasProyecto = response.hours_by_project
    console.log(this.horasProyecto)

  }
}
