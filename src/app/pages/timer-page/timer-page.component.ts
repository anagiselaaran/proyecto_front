import { Component, inject } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { ClockComponent } from '../../components/clock/clock.component';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { UserProjects } from '../../interfaces/empleado.interface';

@Component({
  selector: 'app-timer-page',
  standalone: true,
  imports: [TimerComponent, ClockComponent],
  templateUrl: './timer-page.component.html',
  styleUrl: './timer-page.component.css',
})
export class TimerPageComponent {
  userService = inject(EmpleadosService);
  activatedRoute = inject(ActivatedRoute);

  workHours: number = 0;
  projectList: UserProjects[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      try {
        this.projectList = await this.userService.getProjectsByUserId(params['userId']);
        console.log(this.projectList);

      } catch (error) {
        console.log(error);

      }

    });
    console.log(this.projectList);

  }

  onEndShift(event: number | undefined) {
    if (event !== undefined) {
      this.workHours = event;
    }
  }
}
