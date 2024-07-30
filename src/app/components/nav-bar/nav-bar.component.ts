import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../interfaces/empleado.interface';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomPayload extends JwtPayload{
  userId: number,
  role: string,
  iat:number
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {

  
  router = inject(Router);
  empleadosService = inject(EmpleadosService)
  activatedRoute = inject(ActivatedRoute)
  user!:Empleado
  userId!: number
  userRole!:string

 
  constructor() {
      this.cargarUser()
    }
  
  cargarUser() {
    

    const usTok = this.empleadosService.getTokenData()
    this.userId = usTok.userId
    console.log(this.userId);
    this.userRole = usTok.role
    console.log('su role', this.userRole);

    
  }

  async onClickLogout() {
    const result = await Swal.fire({
      title: '¿Estás segur@?',
      text: 'Vas a abandonar la aplicación. Confirma tu decisión.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Salir de la aplicación'
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }
  }

}
