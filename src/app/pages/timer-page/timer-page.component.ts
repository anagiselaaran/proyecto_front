import { Component } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { Observable, timer, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-timer-page',
  standalone: true,
  imports: [TimerComponent, AsyncPipe],
  templateUrl: './timer-page.component.html',
  styleUrl: './timer-page.component.css',
})
export class TimerPageComponent {
  // TODO: Turn clock property into a component?
  clock: Observable<string> = timer(0, 1000).pipe(
    map((updateTick) => DateTime.now().toFormat('hh:mm:ss'))
  );
}
