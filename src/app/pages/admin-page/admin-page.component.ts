import { Component, inject } from '@angular/core';
import { CardTrabajadoresComponent } from '../../components/card-trabajadores/card-trabajadores.component';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CardTrabajadoresComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {


  arrTrabajadores: Empleado[] = []
  
  empleadosService = inject(EmpleadosService)

  async ngOnInit() {
    const arr = await this.empleadosService.getAll()
    console.log(arr);
    
    this.arrTrabajadores = arr
  }

}
