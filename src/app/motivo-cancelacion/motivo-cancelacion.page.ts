import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-motivo-cancelacion',
  templateUrl: './motivo-cancelacion.page.html',
  styleUrls: ['./motivo-cancelacion.page.scss'],
})
export class MotivoCancelacionPage {
  selectedMotivo: string = ''; 
  enviarEmail: boolean = false; 

  constructor(
    private navCtrl: NavController, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

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
    if (this.selectedMotivo) {
      // Obtener la lista de viajes del localStorage
      let viajes = JSON.parse(localStorage.getItem('viajes') || '[]');
      
      // Eliminar el viaje que se está editando (guardado como 'rutaParaEditar')
      const rutaParaEditar = JSON.parse(localStorage.getItem('rutaParaEditar') || '{}');
      viajes = viajes.filter((viaje: any) => viaje.origen !== rutaParaEditar.origen || viaje.destino !== rutaParaEditar.destino);

      // Guardar la lista actualizada de viajes en el localStorage
      localStorage.setItem('viajes', JSON.stringify(viajes));

      // Eliminar la ruta temporal para editar
      localStorage.removeItem('rutaParaEditar');

      // Mostrar un loading si se seleccionó enviar correo
      if (this.enviarEmail) {
        const loading = await this.loadingCtrl.create({
          message: 'Enviando correo...',
          duration: 2000 // Duración del spinner de 2 segundos
        });
        await loading.present();
        
        // Espera a que el loading termine
        await loading.onDidDismiss();
      }

      // Mensaje combinado de éxito
      const combinedMessage = this.enviarEmail 
        ? 'Correo enviado al pasajero. Ruta borrada exitosamente.'
        : 'Ruta borrada exitosamente.';

      const toast = await this.toastCtrl.create({
        message: combinedMessage,
        duration: 2000,  // Duración del mensaje de éxito
        color: 'success',
        position: 'middle'
      });
      await toast.present();

      // Redirigir al usuario de nuevo a la página "registro-exitoso"
      this.navCtrl.navigateBack('/registro-exitoso');
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
