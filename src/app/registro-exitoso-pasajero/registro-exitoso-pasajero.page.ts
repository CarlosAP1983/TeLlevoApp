import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro-exitoso-pasajero',
  templateUrl: './registro-exitoso-pasajero.page.html',
  styleUrls: ['./registro-exitoso-pasajero.page.scss'],
})
export class RegistroExitosoPasajeroPage implements OnInit {
  rutasDisponibles: any[] = [];
  mostrarSpinner = false;
  rutaSeleccionada: any;

  constructor(
    private navCtrl: NavController, // Para la navegación
    private firestore: Firestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.recuperarRutas();
  }

  // Función para recuperar los viajes disponibles desde Firestore
  recuperarRutas() {
    this.mostrarSpinner = true;
    const viajesRef = collection(this.firestore, 'viajes');
    collectionData(viajesRef, { idField: 'id' }).subscribe(
      (data) => {
        this.rutasDisponibles = data;
        this.mostrarSpinner = false;
      },
      async (error) => {
        this.mostrarSpinner = false;
        const toast = await this.toastController.create({
          message: 'Error al cargar las rutas.',
          duration: 2000,
          color: 'danger',
          position: 'top',
        });
        await toast.present();
      }
    );
  }

  // Función para navegar a la página de cuenta
  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta');
  }

  // Función para navegar a la página de perfil del usuario
  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario');
  }

  // Función para seleccionar una ruta
  selectRuta(ruta: any) {
    this.rutaSeleccionada = ruta;
  }

  // Función para ver los detalles del viaje seleccionado
  async verDetallesViaje() {
    if (this.rutaSeleccionada) {
      const toast = await this.toastController.create({
        message: `Detalles del viaje: Origen: ${this.rutaSeleccionada.origen}, Destino: ${this.rutaSeleccionada.destino}`,
        duration: 3000,
        color: 'success',
        position: 'top',
      });
      await toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'No has seleccionado ninguna ruta.',
        duration: 2000,
        color: 'warning',
        position: 'top',
      });
      await toast.present();
    }
  }

  // Función para recargar las rutas disponibles
  recargarRutas() {
    this.recuperarRutas();
  }
}
