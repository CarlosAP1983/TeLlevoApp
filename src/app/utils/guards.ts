import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router"; // Usa el Router en lugar de NavController

export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Si no está logueado, redirige al usuario a la página de inicio de sesión
  if (!loginService.logeado) {
    router.navigate(['/home'], { replaceUrl: true });
    return false; // Bloquea el acceso a la ruta
  }

  return true; // Permite el acceso si el usuario está logueado
};
