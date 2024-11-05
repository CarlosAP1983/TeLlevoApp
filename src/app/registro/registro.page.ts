import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular'; // Importa AlertController
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name: string = '';
  emailPrefix: string = '';
  phoneSuffix: string = '';
  password: string = '';
  tieneVehiculo: boolean = false;
  vehiculo = {
    patente: '',
    marca: '',
    color: ''
  };

  constructor(
    private navCtrl: NavController, 
    private alertController: AlertController // Inyecta AlertController
  ) {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: '¡ALERTA!',
      message: message,
      buttons: ['CONTINUAR'],
    });
    await alert.present();
  }  

  toggleVehiculo() {
    if (!this.tieneVehiculo) {
      this.vehiculo.patente = '';
      this.vehiculo.marca = '';
      this.vehiculo.color = '';
    }
  }

  async onRegister() {
    if (!this.name || !this.emailPrefix || !this.phoneSuffix || !this.password) {
      await this.presentAlert('Todos los campos son obligatorios');
      return;
    }

    if (this.phoneSuffix.length !== 8) {
      await this.presentAlert('El número de teléfono debe tener 8 dígitos');
      return;
    }

    if (this.password.length !== 6 || !/[A-Za-z]/.test(this.password[0])) {
      await this.presentAlert('La contraseña debe tener 6 caracteres y comenzar con una letra');
      return;
    }

    const email = `${this.emailPrefix}@duocuc.cl`;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, this.password);
      const user = userCredential.user;

      const db = getFirestore();

      const userData: any = {
        name: this.name,
        email: email,
        phone: `+56 9 ${this.phoneSuffix}`,
        vehiculo: this.tieneVehiculo ? {
          patente: this.vehiculo.patente,
          marca: this.vehiculo.marca,
          color: this.vehiculo.color
        } : null
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      await this.presentAlert('Registro exitoso. Redirigiendo al menú...');
      this.navCtrl.navigateForward('/seleccion-perfil');

    } catch (error: any) {
      console.error('Error al registrar en Firebase:', error.message);
      
      // Manejo específico de errores
      if (error.code === 'auth/email-already-in-use') {
        await this.presentAlert('Este correo electrónico ya está en uso. Intenta con otro correo.');
      } else if (error.code === 'auth/invalid-email') {
        await this.presentAlert('El formato del correo electrónico no es válido.');
      } else if (error.code === 'auth/weak-password') {
        await this.presentAlert('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
      } else {
        await this.presentAlert(`Error en el registro: ${error.message}`);
      }
    }
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
