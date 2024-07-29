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
    nombre: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ]),
    telefono: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[1-9]{9}$/)
    ]),
    departamento: new FormControl(null, [Validators.required]),
    salario: new FormControl(null, [
      Validators.required,
      Validators.min(0)
    ]),
  });

  async onSubmit() {
    if (this.formulario.valid) {
      let response = await this.empleadosService.create(this.formulario.value);
      console.log(response);

      this.formulario.reset();
    } else {
      alert('Falta completar el formulario.');
      Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched;
  }
}
