import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  // Método para manejar el inicio de sesión
  login() {
    // Obtener usuarios almacenados en localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]'); 
    // Buscar el usuario en la lista de usuarios almacenados
    const user = storedUsers.find(
      (u: { username: string; password: string }) =>
        u.username === this.username && u.password === this.password
    );

    if (user) {
      // Guardar el usuario actualmente conectado en localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      // Redirigir a la vista de selección de perfil
      this.navCtrl.navigateForward('/seleccion-perfil');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }

  // Método para navegar a la página de registro
  goToRegister() {
    this.navCtrl.navigateForward('/registro'); // Navega a la página de registro
  }
}
