import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";

// authGuard para proteger rutas de usuarios autenticados
export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Si no está logueado, redirige al usuario a la página de inicio de sesión
  if (!loginService.isLoggedIn()) {
    router.navigate(['/home'], { replaceUrl: true });
    return false;  // Bloquea el acceso a la ruta protegida
  }

  return true;  // Permite el acceso si el usuario está logueado
};

// noAuthGuard para evitar que usuarios autenticados accedan a 'home'
export const noAuthGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Si ya está logueado, redirige a la página de selección de perfil
  if (loginService.isLoggedIn()) {
    router.navigate(['/seleccion-perfil'], { replaceUrl: true });
    return false;  // Bloquea el acceso a la página 'home'
  }

  return true;  // Permite el acceso si NO está logueado
};
