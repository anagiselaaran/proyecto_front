import { CanActivateFn } from '@angular/router';
import { JwtPayload, jwtDecode} from 'jwt-decode'
import Swal from 'sweetalert2';


interface CustomPayload extends JwtPayload{
  user_id: string,
  user_role:string
}
export const roleGuardGuard: CanActivateFn = (route, state) => {
  
  const token = localStorage.getItem('token') || "";
  const decoded = jwtDecode<CustomPayload>(token);

  if (decoded.user_role === 'admin') {
    return true
  } else {
    Swal.fire('Zona restringida', 'Solo los administradores pueden realizar modificaciones', 'warning');
    return false
    //TODO: tendria q agregar el router a la pagina del admin?
  }
  
};
