import { Component, inject } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { ClockComponent } from '../../components/clock/clock.component';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-timer-page',
  standalone: true,
  imports: [TimerComponent, ClockComponent],
  templateUrl: './timer-page.component.html',
  styleUrl: './timer-page.component.css',
})
export class TimerPageComponent {
  proyectosService = inject(ProyectosService);

  workHours: number = 0;
  projectList: Proyecto[] = [];

  onEndShift(event: number | undefined) {
    if (event !== undefined) {
      this.workHours = event;
    }
  }
}
