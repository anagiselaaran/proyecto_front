import { Component, inject } from '@angular/core';
import { TimerComponent } from '../../components/timer/timer.component';
import { ClockComponent } from '../../components/clock/clock.component';
import { ActivatedRoute } from '@angular/router';
import {
  CustomPayload,
  EmpleadosService,
} from '../../services/empleados.service';
import { UserProjects } from '../../interfaces/empleado.interface';
import { DptoTransformPipe } from '../../pipes/dpto-transform.pipe';
import { TimeService } from '../../services/time.service';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer-page',
  standalone: true,
  imports: [TimerComponent, ClockComponent, DptoTransformPipe, FormsModule],
  templateUrl: './timer-page.component.html',
  styleUrl: './timer-page.component.css',
})
export class TimerPageComponent {
  userService = inject(EmpleadosService);
  timeService = inject(TimeService);
  activatedRoute = inject(ActivatedRoute);

  tokenData: CustomPayload | null = null;

  workHours: number = 0;
  projectList: UserProjects[] = [];
  activeProjectList: UserProjects[] = [];
  currentProject: UserProjects | null = null;

  // TODO: Make this list dynamic ?
  dptList: string[] = [
    'administration',
    'development',
    'human-resources',
    'marketing',
  ];
  department: string = '';
  message: string = '';

  type: any = null;
  selectDepartment: string = '';

  async ngOnInit() {
    await this.getProjects();
    // Prints a list of all projects on page load
    this.resetActiveProjectList();
    this.tokenData = this.userService.getTokenData();

    // Loads the page with the "Todos" radio button selected by default
    this.type = "all";
  }

  async getProjects() {
    this.projectList = await this.userService.getProjectsByUserId();
  }

  resetActiveProjectList() {
    this.activeProjectList = this.projectList;
  }

  // Listeners
  onChangeAll() {
    this.selectDepartment = "";
    this.getProjects();
    this.resetActiveProjectList();

    if (this.activeProjectList.length === 0) {
      this.message = 'No tienes proyectos asignados';
    }
  }
  onChangeActive() {
    this.selectDepartment = "";
    this.getProjects();

    this.filterByActive();
    if (this.activeProjectList.length === 0) {
      this.message = 'No tienes proyectos activos';
    }
  }

  onChangeClosed() {
    this.selectDepartment = "";
    this.getProjects();

    this.filterByInactive();
    if (this.activeProjectList.length === 0) {
      this.message = 'No tienes proyectos cerrados';
    }
  }

  onSelectChange(departmentOpt: EventTarget | null) {
    this.type = null;
    if (departmentOpt === null) {
      return;
    }

    this.getProjects();
    this.department = (departmentOpt as HTMLSelectElement).value;
    if (this.department === '') {
      this.resetActiveProjectList();
      return;
    }

    this.filterByDepartment(this.department);
    if (this.activeProjectList.length === 0) {
      this.message = 'No tienes proyectos de ';
    }
  }

  onProjectSelect(proj: UserProjects) {
    this.currentProject = proj;
  }

  onEndShift(event: number) {
    if (this.currentProject === null) {
      Swal.fire({
        title: 'Selecciona un proyecto',
        text: 'Selecciona un proyecto para registrar el tiempo de trabajo',
        icon: 'warning',
        backdrop: false,
      });
      return;
    }

    if (this.tokenData !== null) {
      this.workHours = event;

      this.timeService.createTime({
        work_hours_ms: this.workHours,
        id_user: this.tokenData.userId,
        date: DateTime.now().toFormat('yyyy-MM-dd'),
      });

      this.timeService.createProjectTime({
        id_user: this.tokenData.userId,
        id_project: this.currentProject.id,
        hours_by_project: this.workHours,
        date: DateTime.now().toFormat('yyyy-MM-dd'),
      });

      this.currentProject = null;
    }
  }

  // Filters
  filterByActive() {
    this.activeProjectList = this.projectList.filter((proj) => proj.is_active);
  }
  filterByInactive() {
    this.activeProjectList = this.projectList.filter((proj) => !proj.is_active);
  }

  filterByDepartment(department: string) {
    this.activeProjectList = this.projectList.filter((proj) => {
      return proj.department === department;
    });
  }

  // TODO: Make filters by DB queries
  // TODO: Extra - Add queries to the BACK with different order By's to create an "order by" button
}
