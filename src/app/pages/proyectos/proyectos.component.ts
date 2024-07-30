import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProyectosService } from '../../services/proyectos.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {

  router = inject(Router)



  formulario: FormGroup = new FormGroup({
    name: new FormControl(null,Validators.required),
    limit_date: new FormControl(null, Validators.required),
    department: new FormControl<string>('', Validators.required),
    is_active: new FormControl<boolean>(true),
  });

  

  proyectosService = inject(ProyectosService);

  async onSubmit(){
    
    try {
      const response = await this.proyectosService.createProyecto(this.formulario.value);
      await Swal.fire('Éxito', 'Se ha creado el nuevo proyecto exitosamente', 'success');
      this.router.navigate(['/admin', 'panel'])
    } catch (error:any) {
      Swal.fire('Error', 'Hubo un problema al crear el proyecto', 'error');
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }
  
}