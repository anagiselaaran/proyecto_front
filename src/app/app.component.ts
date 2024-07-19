import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProyectosComponent } from "./pages/proyectos/proyectos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProyectosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'time_tracker_front';
}
