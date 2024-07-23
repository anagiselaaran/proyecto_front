import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');//TODO:o como lo llamaron al token
  if (token) {
    const reqHeaders = req.clone({
      headers: req.headers.set('Authorization', token)
    })
    return next(reqHeaders)
  }
  return next(req);
};
