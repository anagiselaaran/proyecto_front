import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {

  empleadosService = inject(EmpleadosService);
  router = inject(Router)
  

  userId: string = ""

  formularioLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ]),
    password: new FormControl(null, []),

  });

  async onSubmit() {
    if (this.formularioLogin.valid) {
      try {
        const response = await this.empleadosService.login(this.formularioLogin.value);
        await Swal.fire({
          title: 'Login usuario',
          text: 'Ha ingresado correctamente',
          icon: 'success',
        });

        localStorage.setItem('token', response.token!);

        this.router.navigateByUrl('/usuarios/registro');

        this.formularioLogin.reset();

      } catch (error) {
        Swal.fire({
          title: 'Error login',
          text: 'Error/usuario contraseña',
          icon: 'error',
        });
      }
    } else {
      Object.values(this.formularioLogin.controls).forEach(control => {
        control.markAsTouched();

      });
    }

    this.router.navigate(['/admin','profile']);
  }



  checkError(controlName: string, errorName: string) {
    return this.formularioLogin.get(controlName)?.hasError(errorName) && this.formularioLogin.get(controlName)?.touched;
  }

  clearForm() {
    this.formularioLogin.reset();
  }
}
