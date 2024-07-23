import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  activatedRoute = inject(ActivatedRoute)  // Inyección del servicio ActivatedRoute
  empleado: Empleado | null = null;  // Inyección del servicio EmpleadosService
  errorMessage: string | null = null; // mostrar los errores


empleadosService = inject(EmpleadosService)
 
  ngOninit() {
    this.activatedRoute.params.subscribe(async params => { // Suscripción a los parámetros de la ruta
      try {
        this.empleado = await this.empleadosService.getById(params['userId']) // Obtiene los datos del empleado por su ID.
      } catch (error:any) {
        this.errorMessage = error.message;

      }
    })


  }
}
