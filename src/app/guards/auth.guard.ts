import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  
  const token = localStorage.getItem('token')
  //TODO:corregir token con el de environment
  const router = inject(Router)
  
  if (token) {
    return true;
  } else {
    Swal.fire('Acceso restringido', 'Necesitas hacer login para acceder', 'warning');
    router.navigateByUrl('/login')
    return false
  }
};
