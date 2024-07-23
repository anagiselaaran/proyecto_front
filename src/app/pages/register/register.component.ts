import { Component, inject } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado.interface';

@Component({
  selector: 'register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  empleadosService = inject(EmpleadosService);

  datosEmpleados: Empleado[] = []


}
