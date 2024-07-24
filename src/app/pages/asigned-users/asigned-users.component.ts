import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'asigned-users',
  standalone: true,
  imports: [],
  templateUrl: './asigned-users.component.html',
  styleUrl: './asigned-users.component.css'
})
export class AsignedUsersComponent {

  empleadosService = inject(EmpleadosService);
  proyectosService = inject(ProyectosService);
  router = inject(Router)



}
