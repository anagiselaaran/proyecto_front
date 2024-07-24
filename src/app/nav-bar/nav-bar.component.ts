import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {

  
  router = inject(Router);
  empleadosService = inject(EmpleadosService)

  async onClickLogout() {
    const result = await Swal.fire({
      title: '¿Estás segur@?',
      text: 'Vas a abandonar la aplicación. Confirma tu decisión.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Salir de la aplicación'
    });

    if (result.isConfirmed) {
      localStorage.removeItem('crmtoken');
      this.router.navigateByUrl('/login');
    }
  }

  logout() { 
    if (localStorage.getItem('crmtoken')) {
      return true;
    } else {
      return false;
    }
  }

}
