import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  // Datos del formulario de registro
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  userType: string = ''; // Variable para almacenar el tipo de usuario
  errorMessage: string = '';

  vehiculo = {
    patente: '',
    color: '',
    marca: ''
  };

  // Definir los tipos de usuario
  userTypes = [
    { label: 'Usuario Conductor', value: 'conductor' },
    { label: 'Usuario Pasajero', value: 'pasajero' }
  ];

  constructor(private navCtrl: NavController) {}

  // Función para manejar el registro del usuario
  onRegister() {
    // Validación de las contraseñas
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Validación del tipo de usuario
    if (!this.userType) {
      this.errorMessage = 'Por favor, selecciona un tipo de usuario';
      return;
    }

    // Lógica para procesar el registro (incluye los datos del vehículo)
    console.log('Datos del vehículo:', this.vehiculo);
    console.log('Datos del usuario:', {
      name: this.name,
      email: this.email,
      username: this.username,
      phone: this.phone,
      userType: this.userType
    });

    // Redirigir según el tipo de usuario seleccionado
    if (this.userType === 'conductor') {
      console.log('Registro exitoso como Conductor');
      this.navCtrl.navigateForward('/registro-exitoso'); // Redirige a la vista del conductor
    } else if (this.userType === 'pasajero') {
      console.log('Registro exitoso como Pasajero');
      this.navCtrl.navigateForward('/registro-exitoso-pasajero'); // Redirige a la vista del pasajero
    }
  }

  // Maneja el cambio de tipo de usuario
  onUserTypeChange(event: any) {
    console.log('Tipo de usuario seleccionado:', event.detail.value);
  }

  // Navega a la página de inicio
  goHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
