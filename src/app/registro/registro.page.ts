import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name: string = '';
  email: string = ''; //Agregar propiedad email
  phone: string = ''; //Agregar propiedad telefono
  username: string = '';
  password: string = '';
  tieneVehiculo: boolean = false; //Estado del toggle para el vehículo
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
    //Validar que los campos no esten vacios
    if (!this.name || !this.email || !this.phone || !this.username || !this.password) {
      this.showToast('Todos los campos son obligatorios', 'danger');
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      username: this.username,
      password: this.password,
      vehiculo: this.tieneVehiculo ? this.vehiculo : null, //Guardar datos del vehiculo si lo tiene
      perfil: ''
    };

    //Obtener usuarios existentes de localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    //Verificar si el usuario ya existe
    const userExists = storedUsers.some(
      (user: any) => user.username === this.username
    );

    if (userExists) {
      this.showToast('El nombre de usuario ya esta en uso', 'danger');
      return;
    }

    //Añadir los nuevos usuarios al array de usuarios
    storedUsers.push(newUser);

    //Guardar los usuarios actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    //Mostrar mensaje de exito tipo toast
    this.showToast('Registro exitoso. Redirigiendo...', 'success');

    //Redirigir al usuario a la pagina de selección de perfil
    this.navCtrl.navigateForward('/seleccion-perfil');
  }

  //Metodo para mostrar un toast
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
    this.navCtrl.navigateRoot('/home'); //ir al home
  }
}
