import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioActual: any = null;

  constructor(
    private afAuth: AngularFireAuth, 
    private navCtrl: NavController,  
    private toastService: ToastService  
  ) {
    this.afAuth.authState.subscribe(user => {
      this.usuarioActual = user; 
    });
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error: any) {
      throw error;
    }
  }

  getNombreUsuario(): string | null {
    return this.usuarioActual ? this.usuarioActual.email : null;
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.usuarioActual = null;
      this.navCtrl.navigateRoot('/home', { replaceUrl: true });
    } catch (error) {
      throw error;
    }
  }
}
