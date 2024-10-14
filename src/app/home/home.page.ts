import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  nombreUsuario: string = '';
  contrasena: string = '';

  destino: string = ''; 
  LoginService = inject(LoginService);

  constructor(private navCtrl: NavController) {}

  // Método para manejar el inicio de sesión
  iniciarSesion() {
    this.LoginService.login(this.nombreUsuario, this.contrasena);
    this.navCtrl.navigateForward('/seleccion-perfil'); // Si tiene cuenta pasa a la vista seleccion-perfil
  }

  // Método para pasar a la página de registro
  irARegistro() {
    this.navCtrl.navigateForward('/registro'); // Pasa a la vista registro
  }
}
