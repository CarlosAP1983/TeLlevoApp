import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Ruta {
  id?: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  precio?: string;
  AsientosDisponibles?: number;
  conductorId?: string;
  conductor?: string;
  vehiculo?: {
    color: string;
    marca: string;
    patente: string;
  };
}

@Component({
  selector: 'app-registro-exitoso-pasajero',
  templateUrl: './registro-exitoso-pasajero.page.html',
  styleUrls: ['./registro-exitoso-pasajero.page.scss'],
})
export class RegistroExitosoPasajeroPage implements OnInit {
  rutasDisponibles: Ruta[] = [];
  misViajesCreados: Ruta[] = [];
  rutaSeleccionada: Ruta | null = null;
  mostrarSpinner: boolean = false; // Controla la visualización del spinner
  selectedIndex: number | null = null;

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController // Para la alerta de rutas actualizadas
  ) {}

  ngOnInit() {
    this.obtenerRutasDisponibles();
    this.obtenerMisViajesCreados();
  }

  async obtenerRutasDisponibles() {
    try {
      const snapshot = await this.firestore.collection('viajes').get().toPromise();
      if (!snapshot || snapshot.empty) {
        console.warn('No se encontraron rutas disponibles.');
        return;
      }
      this.rutasDisponibles = snapshot.docs.map(doc => doc.data() as Ruta);
    } catch (error) {
      console.error('Error al obtener las rutas disponibles:', error);
    }
  }

  async obtenerMisViajesCreados() {
    try {
      const snapshot = await this.firestore.collection('solicitudesPasajeros').get().toPromise();
      if (!snapshot || snapshot.empty) {
        console.warn('No se encontraron viajes creados por el pasajero.');
        return;
      }
      this.misViajesCreados = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Ruta)
      }));
    } catch (error) {
      console.error('Error al obtener los viajes creados por el pasajero:', error);
    }
  }

  async recargarRutas() {
    this.mostrarSpinner = true; // Muestra el spinner
    await this.obtenerRutasDisponibles();
    await this.obtenerMisViajesCreados();
    this.mostrarSpinner = false; // Oculta el spinner

    const alert = await this.alertController.create({
      header: 'Actualización',
      message: 'Viajes y rutas actualizados.',
      buttons: ['OK']
    });
    await alert.present();
  }

  toggleRoute(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  gestionarViaje(index: number) {
    const rutaParaGestionar = this.misViajesCreados[index];
    this.navCtrl.navigateForward('/programar-viaje-pasajero', { state: { ruta: rutaParaGestionar } });
  }

  cancelarViaje(index: number) {
    const rutaParaCancelar = this.misViajesCreados[index];
    if (rutaParaCancelar.id) {
      this.navCtrl.navigateForward('/motivo-cancelacion', { state: { rutaId: rutaParaCancelar.id } });
    } else {
      console.warn('No se encontró el ID de la ruta para cancelar.');
    }
  }

  async mostrarActionSheet(ruta: Ruta) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Detalles de la Ruta',
      buttons: [
        {
          text: 'VER RUTA DISPONIBLE',
          icon: 'information-circle-outline',
          handler: () => {
            this.verDetallesViaje(ruta);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Acción cancelada');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  verDetallesViaje(ruta: Ruta) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta } });
  }

  goToCuenta() {
    this.navCtrl.navigateForward('/cuenta');
  }

  goToUserProfile() {
    this.navCtrl.navigateForward('/perfil-usuario');
  }

  crearSolicitud() {
    this.navCtrl.navigateForward('/programar-viaje-pasajero');
  }
}
