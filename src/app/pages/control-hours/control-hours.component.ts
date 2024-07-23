import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'control-hours',
  standalone: true,
  imports: [],
  templateUrl: './control-hours.component.html',
  styleUrl: './control-hours.component.css'
})
export class ControlHoursComponent {

  empleadosService = inject(EmpleadosService)
  activatedRoute = inject(ActivatedRoute)

  ngOnInit() {
  
    this.activatedRoute.params.subscribe(async params => {
      const user = await this.empleadosService.getById(params['user_id'])
      
      console.log(user);
      
    })
}

}
