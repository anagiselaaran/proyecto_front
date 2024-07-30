import { Component, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from '../../services/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { UserProjects } from '../../interfaces/empleado.interface';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';

interface CustomPayload extends JwtPayload {
  userId: number,
  role: string,
  iat:number
}


@Component({
  selector: 'user-projects',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, UserProjectsComponent],
  templateUrl: './user-projects.component.html',
  styleUrl: './user-projects.component.css'
})
export class UserProjectsComponent {

  empleadosService = inject(EmpleadosService);
  proyectosService = inject(ProyectosService);
  activatedRoute = inject(ActivatedRoute);
  arrProyectos: UserProjects[] = [];
  arrHours: any[] = [];
  contracted_hours: number = 0;
  horasProyecto: number = 0;
  userId: number = 0;
  localDate: Date = new Date();
  date: Date = new Date();
  weeklyHours: number = 0;
  horasSemanal: number = 0;
  horasPorAsignar: number = 0;



 /*  formHoras: FormGroup = new FormGroup({
    projectId: new FormControl(),
    hours: new FormControl()
  });
 */
  
  async ngOnInit() {
    this.cargarProyectos();
    this.cargarUser();
  }
  
  async cargarUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const deco = jwtDecode<CustomPayload>(token);
      this.userId = deco.userId;
      if (!this.userId) {
        throw new Error('Invalid token: id not found');
      }
      //recogemos las horas almacenadas en la base de datos que ya han sido asignadas a proyectos esta semana
    const localArrHours = await JSON.parse(localStorage.getItem('weeklyHours') || '[]');
      this.weeklyHours = Number(localArrHours[1]);

      const user = await this.empleadosService.getById(this.userId);
      this.contracted_hours = user.contracted_hours;
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }
  
  async cargarProyectos(): Promise<void> {
    try {
      this.arrProyectos = await this.empleadosService.getProyectosPorUsuario();
    } catch (error: any) {
      console.error('Error al cargar los proyectos:', error);
    }
  }
  //que reciba todos los proyectos y los pinte de nuevo
 /*  async onSubmit(id: number) {
    const horas = Number(this.formHoras.value.hours);
    this.formHoras.controls['projectId'].setValue(id);
    const localstore = localStorage.getItem('restoHoras')

    if (localstore === '0') {
      console.log(localStorage.getItem('restoHoras'));
      //alerta  no hay mas horas
      await Swal.fire({
        title: 'No le quedan horas por asignar',
        text: 'Revise sus horas trabajadas',
        icon: 'error',
      });
      return;
    }
    
    if (localstore !== '0') {     //miramos si hay datos en el localstorage
      let horasRestantes = localStorage.getItem('restoHoras') //si hay, lo  recuperamos
      if (horas > Number(horasRestantes)) {
            //aviso que no puede
        await Swal.fire({
          title: 'No puede agregar mas horas de las que tiene',
          text: 'Cambie la cantidad a introducir',
          icon: 'error',
        });
          } else {
            this.horasPorAsignar = Number(horasRestantes) - horas;  //restamos a las horas restantes a las horas que introduce el usuario
        const response = await this.empleadosService.asignHoursToProjects(this.formHoras.value);// cambiar la response en el back

        // sumar las horas que se asignan al proyecto a las asignadas en el localstorage
        const guardadas = Number(localStorage.getItem('asignadas')) + horas;
        
        localStorage.setItem('asignadas', JSON.stringify(guardadas))//estaba horas anteriores + MAS LAS QUE PASE EL USUARIO
            localStorage.setItem('restoHoras', JSON.stringify(this.horasPorAsignar));//guardamos en el localstorage las horas que faltan por asignar
            this.horasProyecto = horas + this.horasProyecto;
        console.log(response)// al ser 0 no me deja llegar aqui
      } 
      return;

    } else {
      this.horasProyecto = this.weeklyHours - horas; 
      const response = await this.empleadosService.asignHoursToProjects(this.formHoras.value);
      localStorage.setItem('asignadas', JSON.stringify(horas)); //guardamos en el localstorage
      localStorage.setItem('restoHoras', JSON.stringify(this.horasProyecto))
      return;
    }
  } */
  /* async getHours() {
    //sacar el año mes y dia actual
    this.date = new Date();
    const year = this.date.getFullYear();
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    const body = { userId: this.userId.toString(), date: formattedDate }
    console.log('body',body)
    this.arrHours = await this.empleadosService.getWeeklyHours(body);
    this.date = this.arrHours[0].week_start_date;
    console.log(this.date, 'aqui')
    this.horasSemanal = parseFloat(this.arrHours[0].total_hours_weekly);
    
  }


  async comparingDates(localeDate:Date, dataDate:Date) {
    if (localeDate !== dataDate) {
      localStorage.setItem('localeDate', JSON.stringify(this.date))
      
    /*   localStorage.setItem('asignadas', JSON.stringify(0)); //guardamos en el localstorage
      localStorage.setItem('restoHoras', JSON.stringify(0))
      this.horasProyecto = 0;
    } 
  } */
}