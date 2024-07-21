import { Component, Input } from '@angular/core';
import { Empleado } from '../../interfaces/empleado.interface';

@Component({
  selector: 'card-trabajadores',
  standalone: true,
  imports: [],
  templateUrl: './card-trabajadores.component.html',
  styleUrl: './card-trabajadores.component.css'
})
export class CardTrabajadoresComponent {

  @Input() trabajador: Empleado | null = null;
  


}
