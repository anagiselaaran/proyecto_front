import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTime, Duration } from 'luxon';
import { map, Observable, timer } from 'rxjs';
import { UserProjects } from '../../interfaces/empleado.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  @Input() projectSelected: UserProjects | null = null;
  @Output() workHours: EventEmitter<number> = new EventEmitter();

  Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  elapsed: Duration = Duration.fromMillis(0);

  timerSource: Observable<number> = timer(0, 1000);
  timer: Observable<string> | null = null;

  resetTimer: string = '00:00:00';
  resumeTimerFrom: string = '';

  startedAt: DateTime | null = null;
  pausedAt: DateTime | null = null;
  resumedAt: DateTime | null = null;
  stoppedAt: DateTime | null = null;

  isPaused: boolean = true;
  firstStart: boolean = true;

  startTimer() {
    if (this.projectSelected === null) {
      this.Toast.fire({
        icon: 'error',
        title: 'Selecciona un proyecto',
        text: 'Por favor, selecciona un proyecto para empezar el tiempo de trabajo',
      });
      return;
    }
    if (!this.firstStart) {
      return;
    }

    // Mark start timestamp
    this.startedAt = DateTime.now();

    // Mark first start
    this.firstStart = false;
    // Change pause state
    this.isPaused = false;

    // Start the timer
    this.timer = this.timerSource.pipe(
      map((updateTick) => {
        const diff = DateTime.now().diff(this.startedAt!);
        return diff.toFormat('hh:mm:ss');
      })
    );
  }

  resumeTimer() {
    if (this.firstStart || !this.isPaused) {
      return;
    }

    // Mark resume timestamp
    this.resumedAt = DateTime.now();

    // Change pause state
    this.isPaused = false;

    // Restart the timer
    this.timer = this.timerSource.pipe(
      map((updateTick) => {
        // Compares
        const diff = DateTime.now().diff(this.resumedAt!.minus(this.elapsed));
        return diff.toFormat('hh:mm:ss');
      })
    );
  }

  pauseTimer() {
    if (this.firstStart || this.isPaused) {
      return;
    }
    // Mark pause timestamp
    this.pausedAt = DateTime.now();
    // Store previous elapsed time
    const previous: number = this.elapsed.as('milliseconds');

    // Calculate elapsed time for new interval
    this.elapsed = DateTime.now().diff(this.resumedAt || this.startedAt!);
    // Calculate new total elapsed time
    this.elapsed = this.elapsed.plus(previous);
    this.resumeTimerFrom = this.elapsed.toFormat('hh:mm:ss');

    // Stop the timer
    this.timer = null;
    this.isPaused = true;
  }

  async stopTimer() {
    if (this.firstStart || !this.isPaused) {
      return;
    }

    const response: any = await Swal.fire({
      title: 'Quieres finalizar la sesión de trabajo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#399e52',
    });

    if (response.isConfirmed) {
      this.Toast.fire({
        icon: 'success',
        title: 'Sesión de trabajo finalizada',
        text: 'Que tengas un buen dia!',
      });

      // Emit work hours
      this.endShift();

      // Register stoppedAt
      this.stoppedAt = DateTime.now();
      // Stop the timer
      this.timer = null;
      // Reset startedAt
      this.startedAt = null;
      this.firstStart = true;
      // Reset resume
      this.elapsed = Duration.fromMillis(0);
      this.resumeTimerFrom = '';
      // Reset paused
      this.isPaused = true;
      this.pausedAt = null;
    }
  }

  endShift() {
    const milliseconds: number = this.elapsed.toMillis();
    this.workHours.emit(milliseconds);
  }
}
