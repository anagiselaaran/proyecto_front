import { Component, Input } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'card-project',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './card-project.component.html',
  styleUrl: './card-project.component.css'
})
export class CardProjectComponent {

  @Input() project!:Proyecto 
}
