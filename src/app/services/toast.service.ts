import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  // Mostrar Toast
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


