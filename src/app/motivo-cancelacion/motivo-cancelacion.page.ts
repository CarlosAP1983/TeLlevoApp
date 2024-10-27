import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Usar AngularFirestore en lugar de Firestore
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-motivo-cancelacion',
  templateUrl: './motivo-cancelacion.page.html',
  styleUrls: ['./motivo-cancelacion.page.scss'],
})
export class MotivoCancelacionPage {
  selectedMotivo: string = ''; 
  enviarEmail: boolean = false; 
  rutaId: string = ''; // Almacenar el ID de la ruta

  constructor(
    private navCtrl: NavController, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore, // Inyección de AngularFirestore
    private route: ActivatedRoute // Usar ActivatedRoute para recibir el estado de navegación
  ) {}

  ionViewWillEnter() {
    // Recibir la ID de la ruta a cancelar usando el estado de navegación
    const state = history.state;
    if (state && state.rutaId) {
      this.rutaId = state.rutaId;
    }
  }

  // Método para seleccionar el motivo de cancelación
  onMotivoSelected(event: any) {
    this.selectedMotivo = event.detail.value; 
  }

  // Método para manejar el checkbox de envío de correo
  onEmailToggle(event: any) {
    this.enviarEmail = event.detail.checked;
  }

  // Método para confirmar la cancelación y eliminar el viaje
  async confirmarCancelacion() {
    if (this.selectedMotivo && this.rutaId) {
      try {
        // Mostrar un loading si se seleccionó enviar correo
        if (this.enviarEmail) {
          const loading = await this.loadingCtrl.create({
            message: 'Enviando correo...',
            duration: 2000
          });
          await loading.present();
          await loading.onDidDismiss();
        }

        // Eliminar el viaje desde Firestore usando AngularFirestore y el ID
        await this.firestore.collection('viajes').doc(this.rutaId).delete();

        // Mensaje combinado de éxito
        const combinedMessage = this.enviarEmail 
          ? 'Correo enviado al pasajero. Ruta borrada exitosamente.'
          : 'Ruta borrada exitosamente.';
          
        const toast = await this.toastCtrl.create({
          message: combinedMessage,
          duration: 2000,
          color: 'success',
          position: 'middle'
        });
        await toast.present();

        // Redirigir al usuario de nuevo a la página de gestión de rutas
        this.navCtrl.navigateBack('/gestionar-tus-rutas');
      } catch (error) {
        const toast = await this.toastCtrl.create({
          message: 'Error al cancelar la ruta. Inténtalo de nuevo.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
      
    } else {
      // Mostrar un mensaje si no se ha seleccionado un motivo
      const toast = await this.toastCtrl.create({
        message: 'Por favor, selecciona un motivo de cancelación.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
    }
  }
}
