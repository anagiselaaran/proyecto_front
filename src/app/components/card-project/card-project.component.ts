import { Component, Input } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-project.component.html',
  styleUrl: './card-project.component.css'
})
export class CardProjectComponent {

  @Input() project!:Proyecto 
}
