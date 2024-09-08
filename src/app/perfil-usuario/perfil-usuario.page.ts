import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  avatar: string = 'assets/images/avatar.jpg'; // Ruta del avatar por defecto
  nombre: string = 'Jake Sully'; // Nombre del usuario
  telefono: string = '+56954030670'; // Teléfono del usuario
  usuario: string = 'jake'; // Nombre de usuario
  email: string = 'jakesullya@duocuc.cl'; // Correo electrónico del usuario
  tipoUsuario: string = 'Conductor'; // Tipo de usuario (Conductor o Pasajero)

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  // Función para cambiar la foto de perfil
  uploadPhoto() {
    console.log('Cambiar foto de perfil');
    // Aquí implementa la lógica para subir la foto
  }

  // Función para redirigir a la página de edición del perfil
  editarPerfil() {
    this.navCtrl.navigateForward('/editarPerfil'); // Redirige a la página de edición del perfil
  }
}
