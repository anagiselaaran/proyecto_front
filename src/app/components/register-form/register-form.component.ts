import { Component, inject, input } from '@angular/core';
import { RegisterComponent } from '../../pages/register/register.component';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { DptoTransformPipe } from "../../pipes/dpto-transform.pipe";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [ReactiveFormsModule, RegisterComponent, DptoTransformPipe],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  errorMessages: string[] = [];

  empleadosService = inject(EmpleadosService);
  router = inject(Router)


  formulario: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ]),
    /* telefono: new FormControl(null, [
       Validators.required,
       Validators.pattern(/^[1-9]{9}$/)
     ]),*/
    department: new FormControl(null, [Validators.required]),
    /*salario: new FormControl(null, [
     // Validators.required,
     // Validators.min(0)

    ]),*/
    role: new FormControl(null, [
      Validators.required,

    ]),
    contracted_hours: new FormControl(null, [
      Validators.required,
    ]),




  });

  async onSubmit() {
    if (this.formulario.valid) {
      try {
        const response = await this.empleadosService.create(this.formulario.value);
        Swal.fire('Éxito', 'Se ha creado el nuevo empleado exitosamente', 'success');
        this.formulario.reset();
      } catch (error: any) {
        /*this.errorMessages = error.map((err: any) => err.message);*/
        Swal.fire('Error', 'Hubo un problema al crear el nuevo empleado', 'error');
      }
    } else {
      Swal.fire('Formulario incompleto', 'Falta completar el formulario.', 'warning');
      Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  checkError(controlName: string, errorName: string) {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched;
  }
}
