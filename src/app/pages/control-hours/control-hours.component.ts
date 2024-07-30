import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../../interfaces/empleado.interface';
import { DatePipe, DecimalPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { DptoTransformPipe } from '../../pipes/dpto-transform.pipe';
import { TimeService } from '../../services/time.service';
import { Time } from '../../interfaces/time.interface';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';



@Component({
  selector: 'control-hours',
  standalone: true,
  imports: [UpperCasePipe,TitleCasePipe,DptoTransformPipe,DatePipe, DecimalPipe],
  templateUrl: './control-hours.component.html',
  styleUrl: './control-hours.component.css'
})
export class ControlHoursComponent {

  timeService = inject(TimeService)
  empleadosService = inject(EmpleadosService)
  activatedRoute = inject(ActivatedRoute)
  usuario: Empleado | null = null
  resultado: Time[] = []
  start: string=''
  end:string=''
  periodo: Time[] = []
  id_user!: number
  errorMessage:string=''



  async ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      const user = await this.empleadosService.getById(params['user_id'])
      this.usuario = user
      this.id_user = Number(user.id)
      console.log(user);
      const result = await this.timeService.getByUserId(params['user_id'])
      this.resultado = result
      console.log(this.resultado);

    })
  }

  dateStart($event: any) {
    const startDay = $event.target.value as HTMLInputElement
    console.log('start', startDay);
    this.start = startDay.toString();


  }
  dateEnd($event: any) {
    const endDay = $event.target.value as HTMLInputElement
    console.log('end', endDay);
    this.end = endDay.toString();

  }

  async getPeriod($event:any) {
    try {
      const period = await this.timeService.getByUserIdAndPeriod(this.id_user,this.start, this.end)
      console.log(period);
      this.resultado = period

    } catch (error:any) {
      console.log(error.error.message);
      this.errorMessage = error.error.message
    }

  }

}
