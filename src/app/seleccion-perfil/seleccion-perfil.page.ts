import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-seleccion-perfil',
  templateUrl: './seleccion-perfil.page.html',
  styleUrls: ['./seleccion-perfil.page.scss'],
})
export class SeleccionPerfilPage {
  
  nombreUsuario: string | null = null;
  perfil: string | null = null;

  constructor(
    private navCtrl: NavController,
    public loginSrv: LoginService,
    private toastController: ToastController  // Inyecta el controlador de Toast
  ) {}

  ngOnInit() {
    this.nombreUsuario = this.loginSrv.getNombreUsuario();  // Obtiene el nombre del usuario desde el servicio
  }

  // Seleccionar perfil
  seleccionarPerfil(tipo: string) {
    this.perfil = tipo;
  }

  // Confirmar perfil y redirigir
  confirmarPerfil() {
    if (this.perfil === 'conductor') {
      this.navCtrl.navigateForward('/registro-exitoso');
    } else if (this.perfil === 'pasajero') {
      this.navCtrl.navigateForward('/registro-exitoso-pasajero');
    } else {
      // Mostrar Toast si no se selecciona un perfil
      this.mostrarToast('Por favor, selecciona un perfil.');
    }
  }

  //Mostrar Toast
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,  // Duración en milisegundos
      position: 'middle',  // Posicionarlo en el centro
      cssClass: 'custom-toast',  // Añadir clase personalizada
      translucent: true
    });
    toast.present();
  }
}
