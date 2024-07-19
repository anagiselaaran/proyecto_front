import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(),
    fecha_limite: new FormControl(null),
    departamento: new FormControl<string>(''),
    activo: new FormControl<boolean>(true),
  });

  arrErrores: string[] = []; 

  proyectosService = inject(ProyectosService);

  async onSubmit(){
    try {
      const response = await this.proyectosService.createProyecto(this.formulario.value);
    } catch ({ error, status } :any) {
      if (status === 400) {
        this.arrErrores = error;
      }
    }
  }
  
}