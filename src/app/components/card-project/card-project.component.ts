import { Component, Input } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DptoTransformPipe } from '../../pipes/dpto-transform.pipe';

@Component({
  selector: 'card-project',
  standalone: true,
  imports: [RouterLink,DatePipe, DptoTransformPipe],
  templateUrl: './card-project.component.html',
  styleUrl: './card-project.component.css'
})
export class CardProjectComponent {

  @Input() project!:Proyecto 
}
