import { Component, Input } from '@angular/core';
import { Empleado } from '../../interfaces/empleado.interface';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { DptoTransformPipe } from '../../pipes/dpto-transform.pipe';


@Component({
  selector: 'card-trabajadores',
  standalone: true,
  imports: [DatePipe,TitleCasePipe,DptoTransformPipe],
  templateUrl: './card-trabajadores.component.html',
  styleUrl: './card-trabajadores.component.css'
})
export class CardTrabajadoresComponent {

  @Input() trabajador: Empleado | null = null;

  


}
