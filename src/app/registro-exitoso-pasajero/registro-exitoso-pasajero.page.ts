import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro-exitoso-pasajero',
  templateUrl: './registro-exitoso-pasajero.page.html',
  styleUrls: ['./registro-exitoso-pasajero.page.scss'],
})
export class RegistroExitosoPasajeroPage {
  username: string = ''; 
  rutaSeleccionada: any; 
  mostrarSpinner: boolean = false; 
  rutasDisponibles = [
    { origen: 'Sede', destino: 'Providencia', precio: '$1000', conductor: 'Juan Pedro', hora: '22:30', AsientosDisponibles: 2 },
    { origen: 'Sede', destino: 'Quinta Normal', precio: '$800', conductor: 'Ana Gabriela', hora: '21:20', AsientosDisponibles: 3 },
    { origen: 'Plaza Maipu', destino: 'Estacion Central', precio: '$800', conductor: 'Luis Rey', hora: '22:45', AsientosDisponibles: 1 },
    { origen: 'Sede', destino: 'Lo Prado', precio: '$800', conductor: 'Maria Magdalena', hora: '21:50', AsientosDisponibles: 3 },
  ];

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {
    this.username = history.state.username || 'Carlos';  
  }

  selectRuta(ruta: any) {
    this.rutaSeleccionada = ruta; 
  }

  verDetallesViaje() {
    if (this.rutaSeleccionada) {
      
      this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta: this.rutaSeleccionada } });
    } else {
      this.mostrarToast('Por favor, selecciona un viaje para ver los detalles.', 'danger');
    }
  }

  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta'); 
  }

  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario'); 
  }

  async recargarRutas() {
   
    this.mostrarSpinner = true;

   
    setTimeout(async () => {
      this.mostrarSpinner = false;

      
      const toast = await this.toastCtrl.create({
        message: 'Rutas actualizadas.',
        duration: 2000,
        position: 'middle',
        color: 'success'
      });
      await toast.present();
    }, 3000);
  }

  
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: color 
    });

    await toast.present();
  }
}
