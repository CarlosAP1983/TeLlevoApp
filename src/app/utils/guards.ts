import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';

export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);

  return new Promise<boolean>((resolve) => {
    afAuth.authState.subscribe(user => {
      if (user) {
        resolve(true); // El usuario está autenticado
      } else {
        router.navigate(['/home'], { replaceUrl: true });
        resolve(false); // Bloquear el acceso si no está autenticado
      }
    });
  });
};

export const noAuthGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);

  return new Promise<boolean>((resolve) => {
    afAuth.authState.subscribe(user => {
      if (user) {
        router.navigate(['/seleccion-perfil'], { replaceUrl: true });
        resolve(false); // Bloquear el acceso a la página home si el usuario ya está autenticado
      } else {
        resolve(true); // Permitir el acceso si no está autenticado
      }
    });
  });
};
