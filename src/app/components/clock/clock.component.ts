import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable, timer, map } from 'rxjs';


@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css',
})
export class ClockComponent {
  clock: Observable<string> = timer(0, 1000).pipe(
    map((updateTick) => DateTime.now().setLocale("es").toFormat('hh:mm:ss'))
  );
  date: Observable<string> = timer(0, 80000000).pipe(
    map((updateTick) =>
      DateTime.now().setLocale("es").toLocaleString({
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    )
  );
}
