import { Component, inject } from '@angular/core';
import { CardTrabajadoresComponent } from '../../components/card-trabajadores/card-trabajadores.component';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { CardProjectComponent } from '../../components/card-project/card-project.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CardTrabajadoresComponent,CardProjectComponent,RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {


  arrTrabajadores: Empleado[] = []
  arrProjects: Proyecto[] = []
  userSearched!: Empleado

  selectorP:string=''
  
  empleadosService = inject(EmpleadosService)
  proyectosService = inject(ProyectosService)

  async ngOnInit() {
    const arr = await this.empleadosService.getAll()
    const arrProj = await this.proyectosService.getAll()
    this.arrTrabajadores = arr
    this.arrProjects = arrProj
    
  }

  async onChange($event:any) {
    const search = $event.target.value 
    if (search !== "") {
      const users = await this.empleadosService.getByName(search)
      this.arrTrabajadores = users
      
    } else {
      const users = await this.empleadosService.getAll()
      this.arrTrabajadores = users
    }
  }

  async onSelect($event: any) {
    const result = $event.target.value;
    if (result !== "elige") {
      const projects = await this.proyectosService.getByDepartment(result)
      this.arrProjects = projects
      this.selectorP = result
    } else {
      const projects = await this.proyectosService.getAll()
      this.arrProjects = projects
      this.selectorP = result
      
    }
  }

}
