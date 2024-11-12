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

  // Formatear número de tarjeta (cuatro bloques de 4 dígitos separados por espacios)
  formatearNumeroTarjeta(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Elimina todo lo que no sea dígito
    if (valor.length > 16) valor = valor.slice(0, 16); // Limita a 16 dígitos

    const bloques = valor.match(/.{1,4}/g); // Divide en bloques de 4
    input.value = bloques ? bloques.join(' ') : ''; // Une bloques con espacio
    this.tarjeta.numero = input.value; // Actualiza el modelo
  }

  // Formatear fecha de caducidad (formato MM/AA)
  formatearCaducidad(event: any) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, ''); // Elimina todo lo que no sea dígito
    if (valor.length > 4) valor = valor.slice(0, 4); // Limita a 4 dígitos

    // Aplica el formato MM/AA
    if (valor.length >= 3) {
      valor = valor.slice(0, 2) + '/' + valor.slice(2);
    }
    input.value = valor;
    this.tarjeta.caducidad = valor; // Actualiza el modelo
  }

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
