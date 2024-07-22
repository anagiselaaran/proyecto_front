import { Component, inject } from '@angular/core';
import { CardTrabajadoresComponent } from '../../components/card-trabajadores/card-trabajadores.component';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { CardProjectComponent } from '../../components/card-project/card-project.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CardTrabajadoresComponent,CardProjectComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {


  arrTrabajadores: Empleado[] = []
  arrProyectos: Proyecto[] = []
  
  empleadosService = inject(EmpleadosService)
  proyectosService = inject(ProyectosService)

  async ngOnInit() {
    const arr = await this.empleadosService.getAll()
    console.log(arr);
    const arrProj = await this.proyectosService.getAll()
    
    this.arrTrabajadores = arr
    this.arrProyectos = arrProj
  }

}
