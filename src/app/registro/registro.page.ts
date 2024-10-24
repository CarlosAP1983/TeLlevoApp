import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { ToastService } from 'src/app/services/toast.service';  // Importar el servicio de Toast

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name: string = '';
  emailPrefix: string = '';  // El usuario ingresa solo el prefijo del correo
  phoneSuffix: string = '';  // El usuario ingresa solo el número sin el prefijo
  password: string = ''; 
  tieneVehiculo: boolean = false; 
  vehiculo = {
    patente: '',
    marca: '',
    color: ''
  };

  constructor(
    private navCtrl: NavController, 
    private toastService: ToastService  // Inyectar el servicio de Toast
  ) {}

  toggleVehiculo() {
    if (!this.tieneVehiculo) {
      this.vehiculo.patente = '';
      this.vehiculo.marca = '';
      this.vehiculo.color = '';
    }
  }

  async onRegister() {
    if (!this.name || !this.emailPrefix || !this.phoneSuffix || !this.password) {
      this.toastService.mostrarToast('Todos los campos son obligatorios');
      return;
    }
  
    if (this.phoneSuffix.length !== 8) {
      this.toastService.mostrarToast('El número de teléfono debe tener 8 dígitos');
      return;
    }
  
    if (this.password.length !== 6 || !/[A-Za-z]/.test(this.password[0])) {
      this.toastService.mostrarToast('La contraseña debe tener 6 caracteres y comenzar con una letra');
      return;
    }

    const email = `${this.emailPrefix}@duocuc.cl`; // Concatenar el dominio con el prefijo
  
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, this.password);
      const user = userCredential.user;
  
      const db = getFirestore();
      
      // Construir los datos del usuario con los datos del vehículo solo si tiene vehículo
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
  
      // Guardar los datos del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), userData);
  
      this.toastService.mostrarToast('Registro exitoso. Redirigiendo...');
      this.navCtrl.navigateForward('/seleccion-perfil');
  
    } catch (error) {
      this.toastService.mostrarToast('Error en el registro');
    }
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
