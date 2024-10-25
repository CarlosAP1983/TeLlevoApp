import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuarioActual: any = null;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.usuarioActual = user;
    });
  }

  // Observable público para el estado de autenticación
  get authState() {
    return this.afAuth.authState;
  }

  // Método para el login sin configurar persistencia
  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para obtener el nombre del usuario autenticado
  getNombreUsuario(): string | null {
    return this.usuarioActual ? this.usuarioActual.email : null;
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }

  //Cerrar sesión
  async logout() {
    return this.afAuth.signOut();
  }
}
