import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contacto-pasajero',
  templateUrl: './contacto-pasajero.page.html',
  styleUrls: ['./contacto-pasajero.page.scss'],
})
export class ContactoPasajeroPage {
  solicitud: any;
  rating = 0;
  stars = [1, 2, 3, 4, 5];
  viajeEnCurso: boolean = true;
  mostrarSpinner: boolean = false;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.solicitud = history.state.solicitud;
  }

  // Método para finalizar el viaje y dar calificación
  async finalizarViaje() {
    const alert = await this.alertCtrl.create({
      header: '¿Te gusta el servicio?',
      message: 'Haz clic en las estrellas para valorar',
      cssClass: 'rating-alert',
      inputs: this.stars.map((star, index) => ({
        type: 'radio',
        label: this.renderStars(index + 1),
        value: index + 1,
        checked: index + 1 === this.rating,
        handler: () => this.highlightSelectedStars(index + 1),
        cssClass: 'star-input'
      })),
      buttons: [
        {
          text: 'Ahora no',
          role: 'cancel',
          cssClass: 'cancel-button',
          handler: () => this.showThankYouMessage(false),
        },
        {
          text: 'Enviar',
          handler: (value) => {
            if (value === undefined) {
              this.showNoSelectionMessage();
            } else {
              this.submitRating(value);
              this.showThankYouMessage(true);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  renderStars(count: number): string {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  }

  highlightSelectedStars(count: number) {
    this.rating = count;
    const starInputs = document.querySelectorAll('.star-input');
    starInputs.forEach((input, index) => {
      if (index < count) {
        input.classList.add('selected');
      } else {
        input.classList.remove('selected');
      }
    });
  }

  async submitRating(value: number) {
    this.rating = value;
  }

  async showThankYouMessage(rated: boolean) {
    const message = rated ? 'Gracias por calificar nuestra app' : 'Gracias por usar nuestra aplicación';
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
    this.navCtrl.navigateBack('/gestionar-tus-rutas');
  }

  async showNoSelectionMessage() {
    const toast = await this.toastCtrl.create({
      message: 'No marcaste ninguna opción',
      duration: 2000,
      position: 'bottom',
      color: 'warning',
    });
    await toast.present();
  }
}
