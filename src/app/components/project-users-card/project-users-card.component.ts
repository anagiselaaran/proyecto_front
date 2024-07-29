import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../interfaces/empleado.interface';
import { DtoTransformPipe } from '../../pipes/dpto-transform.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { Proyecto } from '../../interfaces/proyecto.interface';

@Component({
  selector: 'project-users-card',
  standalone: true,
  imports: [DtoTransformPipe, DatePipe, CommonModule],
  templateUrl: './project-users-card.component.html',
  styleUrl: './project-users-card.component.css'
})
export class ProjectUsersCardComponent {
  @Input() empleado!: Empleado
  @Input() proyecto!: Proyecto
  router = inject(Router)

  /*activatedRoute = inject(ActivatedRoute);
  empleadosService = inject(EmpleadosService);
  projectsService = inject(ProyectosService);
  assignedUsers: any[] = [];*/

  ngOnInit() {

  }
}

