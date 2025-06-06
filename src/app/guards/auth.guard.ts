import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

import {
  AuthService,
} from '../services/auth.service'; // Asegúrate que la ruta a AuthService sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Si el usuario ya está logueado (según Firebase), permite el acceso
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Si no está logueado, redirige a la página de login
    console.log('Usuario no autenticado, redirigiendo a login.');
    return this.router.createUrlTree(['/login']);
  }
}