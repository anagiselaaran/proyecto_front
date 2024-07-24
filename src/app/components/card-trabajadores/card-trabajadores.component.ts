import { Component, Input } from '@angular/core';
import { Empleado } from '../../interfaces/empleado.interface';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'card-trabajadores',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card-trabajadores.component.html',
  styleUrl: './card-trabajadores.component.css'
})
export class CardTrabajadoresComponent {

  @Input() trabajador: Empleado | null = null;

  


}
