import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {
  nombre: string = 'Carlos Araya';
  telefono: string = '+56954030670';
  usuario: string = 'carlos.araya';
  email: string = 'carlos.araya@duocuc.cl';

  constructor(private navCtrl: NavController) {}

  // Función para guardar los cambios
  guardarCambios() {
    console.log('Guardando cambios del perfil');
    // Implementa la lógica para guardar los cambios
    this.navCtrl.back(); // Vuelve a la página anterior después de guardar
  }
}
