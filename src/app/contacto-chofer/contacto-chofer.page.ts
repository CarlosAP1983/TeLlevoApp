import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contacto-chofer',
  templateUrl: './contacto-chofer.page.html',
  styleUrls: ['./contacto-chofer.page.scss'],
})
export class ContactoChoferPage {
  ruta: any;
  rating = 0;
  stars = [1, 2, 3, 4, 5];

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.ruta = history.state.ruta;
  }

  // Muestra el alert de calificación al finalizar el viaje
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
        handler: () => this.highlightSelectedStars(index + 1), // Llama a la función para resaltar
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

  // Renderiza estrellas interactivas en el alert
  renderStars(count: number): string {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  }

  // Destaca las estrellas seleccionadas
  highlightSelectedStars(count: number) {
    this.rating = count; // Actualiza la calificación seleccionada
    const starInputs = document.querySelectorAll('.star-input');
    starInputs.forEach((input, index) => {
      if (index < count) {
        input.classList.add('selected'); // Añade la clase 'selected' para destacar
      } else {
        input.classList.remove('selected');
      }
    });
  }

  // Envía la calificación y muestra un mensaje de agradecimiento
  async submitRating(value: number) {
    this.rating = value;
  }

  // Muestra mensaje de agradecimiento
  async showThankYouMessage(rated: boolean) {
    const message = rated ? 'Gracias por calificar nuestra app' : 'Gracias por usar nuestra aplicación';
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
    this.navCtrl.navigateBack('/registro-exitoso-pasajero');
  }

  // Muestra mensaje si no se seleccionó ninguna opción
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
