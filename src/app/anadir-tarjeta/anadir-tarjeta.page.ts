import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-anadir-tarjeta',
  templateUrl: './anadir-tarjeta.page.html',
  styleUrls: ['./anadir-tarjeta.page.scss'],
})
export class AnadirTarjetaPage {
  tarjeta = {
    numero: '',
    caducidad: '',
    titular: '',
    cvv: ''
  };

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  // Confirmar datos de tarjeta
  async confirmarDatos() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que los datos son correctos?',
      buttons: [
        {
          text: 'Atrás',
          role: 'cancel',
        },
        {
          text: 'Continuar',
          handler: async () => {
            await this.guardarTarjeta();
          }
        }
      ]
    });
    await alert.present();
  }

  // Guardar la tarjeta en Firestore
  async guardarTarjeta() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const tarjetaData = {
        tarjeta: {
          numero: this.tarjeta.numero,
          caducidad: this.tarjeta.caducidad,
          titular: this.tarjeta.titular,
          cvv: this.tarjeta.cvv
        }
      };
      await updateDoc(docRef, tarjetaData);
      this.navCtrl.navigateBack('/editar-perfil'); // Regresar a la vista de perfil
    }
  }
}
