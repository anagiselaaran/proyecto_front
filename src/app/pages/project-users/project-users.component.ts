import { Component, OnInit, inject } from '@angular/core';
import { ProjectUsersCardComponent } from '../../components/project-users-card/project-users-card.component';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'project-users',
  standalone: true,
  imports: [ProjectUsersCardComponent],
  templateUrl: './project-users.component.html',
  styleUrl: './project-users.component.css'
})
export class ProjectUsersComponent implements OnInit {
  arrEmpleados: Empleado[] = [];
  proyectosService = inject(ProyectosService);
  arrProyectos: Proyecto[] = [];
  empleadosService = inject(EmpleadosService);
  activateRoute = inject(ActivatedRoute);

  async ngOnInit() {
    this.activateRoute.params.subscribe(async params => {
      const projectId = Number(params['projectId']);
      console.log(projectId);

      try {
        this.arrEmpleados = await this.empleadosService.getUsersByProject(projectId);
      } catch (error) {
        console.error('Error cargando usuarios o proyecto', error);
      }
    });
  }
}
