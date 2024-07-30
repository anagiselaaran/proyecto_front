import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { ProyectosService } from '../../services/proyectos.service';
import { DptoTransformPipe } from '../../pipes/dpto-transform.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { Proyecto } from '../../interfaces/proyecto.interface';

@Component({
  selector: 'project-users-card',
  standalone: true,
  imports: [DptoTransformPipe, DatePipe, CommonModule],
  templateUrl: './project-users-card.component.html',
  styleUrl: './project-users-card.component.css'
})
export class ProjectUsersCardComponent {
  @Input() empleado!: Empleado
  router = inject(Router)

  activatedRoute = inject(ActivatedRoute);
  empleadosService = inject(EmpleadosService);
  projectsService = inject(ProyectosService);
  arrEmpleados: Empleado[] = [];

  ngOnInit() {

  }

  toggleStatus = () => {
    this.empleado.is_active = !this.empleado.is_active;
  }

  getClasses() {
    return {
      'text-success': this.empleado.is_active,
      'text-danger': !this.empleado.is_active
    };
  }
}