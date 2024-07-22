import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, timer, map } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent {
  clock: Observable<string> = timer(0, 1000).pipe(
    map((updateTick) => DateTime.now().toFormat('hh:mm:ss'))
  );
}
