import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  ruta: any;
  esSolicitudPasajero: boolean = false; 
  mostrarSpinner: boolean = false;
  tarjetaRegistrada: boolean = false;
  formaPagoSeleccionada: string | null = null; // Variable para almacenar la forma de pago seleccionada

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {
    this.ruta = history.state.ruta;
    this.esSolicitudPasajero = history.state.esSolicitudPasajero || false; 
  }

  ngOnInit() {
    this.verificarTarjetaRegistrada();
  }

  // Verificar si el usuario tiene una tarjeta registrada en su perfil
  async verificarTarjetaRegistrada() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        this.tarjetaRegistrada = !!userData['tarjeta'];
      }
    }
  }

  // Método para aceptar la solicitud o tomar el viaje
  async aceptarSolicitud() {
    if (!this.formaPagoSeleccionada) {
      // Mostrar un mensaje si no se ha seleccionado una forma de pago
      const alert = await this.alertController.create({
        header: 'Forma de Pago Requerida',
        message: 'Por favor, selecciona una forma de pago antes de tomar el viaje.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.mostrarSpinner = true;

    setTimeout(async () => {
      this.mostrarSpinner = false;

      if (this.esSolicitudPasajero) {
        this.navCtrl.navigateForward('/contacto-pasajero', { state: { solicitud: this.ruta } });
        this.mostrarToast("Solicitud del pasajero aceptada.");
      } else {
        this.navCtrl.navigateForward('/contacto-chofer', { state: { ruta: this.ruta, formaPago: this.formaPagoSeleccionada } });
        this.mostrarToast("Viaje aceptado.");
      }
    }, 3000);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  // Método para mostrar el ActionSheet de opciones de pago
  async mostrarOpcionesPago() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Cómo quieres pagar?',
      buttons: [
        {
          text: 'Tarjeta de crédito o débito (Cargo automático a tu tarjeta)',
          icon: 'card-outline',
          handler: () => {
            this.pagarConTarjeta();
          }
        },
        {
          text: 'Efectivo (Paga con efectivo al conductor)',
          icon: 'cash-outline',
          handler: () => {
            this.formaPagoSeleccionada = 'Efectivo';
            this.mostrarToast('Pago en efectivo seleccionado');
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Pago cancelado');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  // Método para gestionar el pago con tarjeta
  async pagarConTarjeta() {
    if (this.tarjetaRegistrada) {
      const alert = await this.alertController.create({
        header: 'Confirmación de Pago',
        message: '¿Está seguro de que desea realizar el pago con la tarjeta registrada?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Continuar',
            handler: () => {
              this.formaPagoSeleccionada = 'Pago con cargo a Tarjeta';
              this.mostrarToast('Pago con tarjeta seleccionado');
            }
          }
        ]
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Tarjeta No Registrada',
        message: 'No has registrado una tarjeta en tu perfil. Por favor, añade una en tu perfil de usuario.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
