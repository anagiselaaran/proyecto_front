import { Component } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { ClockComponent } from '../../components/clock/clock.component';
import { Duration, DurationLike, DurationUnits } from 'luxon';

@Component({
  selector: 'app-timer-page',
  standalone: true,
  imports: [TimerComponent, ClockComponent],
  templateUrl: './timer-page.component.html',
  styleUrl: './timer-page.component.css',
})
export class TimerPageComponent {
  workHours: number = 0;

  // TODO: Fix event type
  onEndShift(event: any) {
    this.workHours = event;
  }
}
