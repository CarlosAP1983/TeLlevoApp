import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

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

  // Configura la persistencia de sesión en localStorage
  async setPersistence() {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
  }

  // Método para el login
  async login(email: string, password: string) {
    await this.setPersistence();
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para obtener el nombre del usuario autenticado
  getNombreUsuario(): string | null {
    return this.usuarioActual ? this.usuarioActual.email : null;  // Devuelve el email como nombre de usuario
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }

  // Cerrar sesión
  async logout() {
    return this.afAuth.signOut();
  }
}
