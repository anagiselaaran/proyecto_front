
import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { JwtPayload, jwtDecode} from 'jwt-decode'
import Swal from 'sweetalert2';


interface CustomPayload extends JwtPayload{
  user_id: string,
  role: string,
  iat:number
}
export const roleGuardGuard: CanActivateFn = async (route, state) => {
  
  const token = localStorage.getItem('token') || "";
  const decoded = jwtDecode<CustomPayload>(token);
  const router = inject(Router)
  

  if (decoded.role === 'admin') {
    return true
  } else {
    await Swal.fire('Zona restringida', 'Solo los administradores pueden realizar modificaciones', 'warning');
    router.navigate(['/admin','profile'])
    return false
    //TODO: tendria q agregar el router a la pagina del admin?
  }
  
};
