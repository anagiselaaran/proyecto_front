import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserProjectsComponent } from '../../components/user-projects/user-projects.component';

import { jwtDecode, JwtPayload } from 'jwt-decode';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { DptoTransformPipe } from '../../pipes/dpto-transform.pipe';

interface CustomPayload extends JwtPayload {
  userId: number,
  role: string,
  iat: number
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, UserProjectsComponent,TitleCasePipe,DptoTransformPipe,DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  activatedRoute = inject(ActivatedRoute)  // Inyección del servicio ActivatedRoute
  empleado: Empleado | null = null;  // Inyección del servicio EmpleadosService
  errorMessage: string | null = null; // mostrar los errores
  empleadosService = inject(EmpleadosService);
  errorMessages: string[] = [];
  userId: string = "";

  
  newForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(),
    newPassword: new FormControl(),
    newRepPassword: new FormControl(),
  })
  
  async ngOnInit() {
    try {
      const elTok = this.empleadosService.getTokenData()
      const userId = elTok.userId
        this.empleado = await this.empleadosService.getById(userId)// Obtiene los datos del empleado por su ID.
        this.userId = this.empleado.id
        
      } catch (error:any) {
        this.errorMessage = error.message;
      }
   
  }

  async onSubmit() {
    const newPassword = this.newForm.get('newPassword')?.value;
    const newRepPassword = this.newForm.get('newRepPassword')?.value;
    console.log(newPassword, newRepPassword);
    if (newPassword !== newRepPassword) {
      Swal.fire({
        title: 'Error',
        text: 'New password and repeat password do not match',
        icon: 'error',
      });
      return;
    }

   try {
      console.log(this.newForm.value)
      //* Removed userId as parameter from updatePassword method
     const response = await this.empleadosService.updatePassword(this.newForm.value,);
      this.newForm.reset();
      Swal.fire({
        title: 'Success',
        text: 'Password updated successfully',
        icon: 'success',
      });
    } catch ({error}:any) {
      Swal.fire({
        title: 'Error password',
        text: 'Error en  contraseña',
        icon: 'error',
      });
    }
  }
}
