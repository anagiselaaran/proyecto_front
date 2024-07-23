import { Component } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { ClockComponent } from '../../components/clock/clock.component';

@Component({
  selector: 'app-timer-page',
  standalone: true,
  imports: [TimerComponent, ClockComponent],
  templateUrl: './timer-page.component.html',
  styleUrl: './timer-page.component.css',
})
export class TimerPageComponent {
  workHours: number = 0;
  // projectList: Project[] = [];

  onEndShift(event: number | undefined) {
    if (event !== undefined) {
      this.workHours = event;
    }
  }
}
