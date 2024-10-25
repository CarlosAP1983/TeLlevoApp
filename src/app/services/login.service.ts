import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';  // Inyectar NavController
import { ToastService } from './toast.service';  // Inyectar el servicio de Toast

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioActual: any = null;

  constructor(
    private afAuth: AngularFireAuth, 
    private navCtrl: NavController,  // Inyectar NavController
    private toastService: ToastService  // Inyectar el servicio de Toast
  ) {
    // Observa el estado de autenticación
    this.afAuth.authState.subscribe(user => {
      this.usuarioActual = user; 
    });
  }

  // Método para el login
  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error: any) {
      throw error;  // Lanzar el error para que se capture en el componente
    }
  }

  // Obtener el nombre del usuario autenticado
  getNombreUsuario(): string | null {
    return this.usuarioActual ? this.usuarioActual.email : null;
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
      this.usuarioActual = null;
      this.navCtrl.navigateRoot('/home', { replaceUrl: true });  // Redirigir al inicio
    } catch (error) {
      throw error;  // Lanza el error para que el componente lo maneje
    }
  }
}
