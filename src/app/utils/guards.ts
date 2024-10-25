import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

// authGuard para proteger rutas de usuarios autenticados
export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const toastController = inject(ToastController);

  return loginService.authState.pipe(
    map(async user => {
      if (user) {
        const toast = await toastController.create({
          message: 'Acceso autorizado.',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        return true;
      } else {
        const toast = await toastController.create({
          message: 'Redirigiendo a inicio de sesión.',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
        router.navigate(['/home'], { replaceUrl: true });
        return false;
      }
    })
  );
};

// noAuthGuard para evitar que usuarios autenticados accedan a 'home'
export const noAuthGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.authState.pipe(
    map(user => {
      if (user) {
        router.navigate(['/seleccion-perfil'], { replaceUrl: true });
        return false;  // Bloquea el acceso a la página 'home' si el usuario está logueado
      } else {
        return true;  // Permite el acceso si NO está logueado
      }
    })
  );
};
