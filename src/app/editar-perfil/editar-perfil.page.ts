import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {
  nombre: string = 'Jake Sully';
  telefono: string = '+56954030670';
  usuario: string = 'jake';
  email: string = 'jakesullya@duocuc.cl';

  constructor(private navCtrl: NavController) {}

  // Función para guardar los cambios
  guardarCambios() {
    console.log('Guardando cambios del perfil');
    // Implementa la lógica para guardar los cambios
    this.navCtrl.back(); // Vuelve a la página anterior después de guardar
  }

  // Función para eliminar la cuenta
  eliminarCuenta() {
    console.log('Cuenta eliminada');
    // Aquí deberías implementar la lógica para eliminar la cuenta
    this.navCtrl.navigateRoot('/home'); // Redirige al usuario al inicio tras eliminar
  }

  // Función para salir
  salir() {
    console.log('Saliendo de la cuenta');
    // Implementa la lógica para cerrar sesión o salir
    this.navCtrl.navigateRoot('/home'); // Redirige al inicio
  }
}
