import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  password: string = '';

  destination: string = ''; //Variable para almacenar las rutas de destino

  constructor(private navCtrl: NavController) {}

  //Metodo del ciclo de vida de Angular, se llama una vez que la vista se inicializa
  ngOnInit() {}

  //Metodo para manejar el inicio de sesion
  login() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]'); 
    const user = storedUsers.find(
      (u: { username: string; password: string }) =>
        u.username === this.username && u.password === this.password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.navCtrl.navigateForward('/seleccion-perfil'); //Si tiene cuenta pasa a la vista seleccion-perfil
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }

  //Metodo para pasar a la pagina registro
  goToRegister() {
    this.navCtrl.navigateForward('/registro'); //Pasa a la vista registro
  }
}
