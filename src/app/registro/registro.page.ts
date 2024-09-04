import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name: string = '';
  email: string = '';  // Agregar propiedad email
  phone: string = '';  // Agregar propiedad phone
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  tieneVehiculo: boolean = false; // Estado del toggle para el vehículo
  vehiculo = {
    patente: '',
    marca: '',
    color: ''
  };

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  toggleVehiculo() {
    if (!this.tieneVehiculo) {
      // Si no tiene vehículo, limpiar los campos
      this.vehiculo.patente = '';
      this.vehiculo.marca = '';
      this.vehiculo.color = '';
    }
  }

  async onRegister() {
    // Validar que los campos no estén vacíos
    if (!this.name || !this.email || !this.phone || !this.username || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      username: this.username,
      password: this.password,
      vehiculo: this.tieneVehiculo ? this.vehiculo : null, // Guardar datos del vehículo si lo tiene
      perfil: ''
    };

    // Obtener usuarios existentes de localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar si el usuario ya existe
    const userExists = storedUsers.some(
      (user: any) => user.username === this.username
    );

    if (userExists) {
      this.errorMessage = 'El nombre de usuario ya está en uso';
      return;
    }

    // Añadir el nuevo usuario al array de usuarios
    storedUsers.push(newUser);

    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Mostrar mensaje de éxito tipo toast
    const toast = await this.toastCtrl.create({
      message: 'Registro exitoso. Redirigiendo...',
      duration: 2000,
      position: 'middle'
    });
    await toast.present();

    // Redirigir al usuario a la página de selección de perfil
    this.navCtrl.navigateForward('/seleccion-perfil');
  }

  goHome() {
    this.navCtrl.navigateRoot('/home'); // Navega a la página de inicio
  }
}
