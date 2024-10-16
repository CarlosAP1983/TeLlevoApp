import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name: string = '';
  email: string = ''; 
  phone: string = ''; 
  username: string = '';
  password: string = '';
  tieneVehiculo: boolean = false; 
  vehiculo = {
    patente: '',
    marca: '',
    color: ''
  };

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  toggleVehiculo() {
    if (!this.tieneVehiculo) {
      //Si no tiene vehiculo, limpiaremos los campos para oscurecerlos en el scss
      this.vehiculo.patente = '';
      this.vehiculo.marca = '';
      this.vehiculo.color = '';
    }
  }

  async onRegister() {
    // Validar que los campos no estén vacíos
    if (!this.name || !this.email || !this.phone || !this.username || !this.password) {
      this.showToast('Todos los campos son obligatorios', 'danger');
      return;
    }

    try {
      // Registrar al usuario en Firebase Authentication
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;

      // Guardar los datos del usuario en Firestore
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        name: this.name,
        email: this.email,
        phone: this.phone,
        username: this.username,
        vehiculo: this.tieneVehiculo ? this.vehiculo : null,
        perfil: ''
      });

      this.showToast('Registro exitoso. Redirigiendo...', 'success');
      this.navCtrl.navigateForward('/seleccion-perfil');

    } catch (error) {
      console.error('Error en el registro:', error);
      this.showToast('Error en el registro', 'danger');
    }
  }

  // Método para mostrar un toast
  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
      color: color
    });
    await toast.present();
  }

  goHome() {
    this.navCtrl.navigateRoot('/home'); 
  }
}
