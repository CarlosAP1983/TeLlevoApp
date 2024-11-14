import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Ruta {
  id?: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  precio?: string;
  AsientosDisponibles?: number;
  pasajeroNombre?: string;
  asientos?: number;
  conductorId?: string;
  conductor?: string;
  vehiculo?: {
    color: string;
    marca: string;
    patente: string;
  };
}

@Component({
  selector: 'app-gestionar-tus-rutas',
  templateUrl: './gestionar-tus-rutas.page.html',
  styleUrls: ['./gestionar-tus-rutas.page.scss'],
})
export class GestionarTusRutasPage {
  rutas: Ruta[] = [];
  solicitudesViaje: Ruta[] = [];
  selectedIndex: number | null = null;
  mostrarSpinner: boolean = false;
  rutaSeleccionada: Ruta | null = null;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private actionSheetController: ActionSheetController
  ) {}

  async ionViewWillEnter() {
    this.mostrarSpinner = true;
    await this.cargarRutas();
    await this.cargarSolicitudesViaje();
    this.mostrarSpinner = false;
    
    this.mostrarAlerta('Éxito', 'Solicitudes y Rutas actualizadas.');
  }

  async cargarRutas() {
    try {
      const rutasRef = this.firestore.collection('viajes');
      const snapshot = await rutasRef.get().toPromise();

      if (snapshot && !snapshot.empty) {
        this.rutas = snapshot.docs.map(doc => {
          const data = doc.data() as Partial<Ruta>;
          return {
            id: doc.id,
            origen: data.origen || '',
            destino: data.destino || '',
            fecha: data.fecha || '',
            hora: data.hora || '',
            precio: data.precio || '',
            AsientosDisponibles: data.AsientosDisponibles || 0,
            pasajeroNombre: data.pasajeroNombre || '',
            asientos: data.asientos || 0,
            conductorId: data.conductorId || '',
            conductor: data.conductor || '',
            vehiculo: data.vehiculo || { color: '', marca: '', patente: '' }
          } as Ruta;
        });
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Error al cargar las rutas.');
    }
  }

  async cargarSolicitudesViaje() {
    try {
      const solicitudesRef = this.firestore.collection('solicitudesPasajeros');
      const snapshot = await solicitudesRef.get().toPromise();

      if (snapshot && !snapshot.empty) {
        this.solicitudesViaje = snapshot.docs.map(doc => {
          const data = doc.data() as Partial<Ruta>;
          return {
            id: doc.id,
            origen: data.origen || '',
            destino: data.destino || '',
            fecha: data.fecha || '',
            hora: data.hora || '',
            precio: data.precio || '',
            AsientosDisponibles: data.AsientosDisponibles || 0,
            pasajeroNombre: data.pasajeroNombre || '',
            asientos: data.asientos || 0,
            conductorId: data.conductorId || '',
            conductor: data.conductor || '',
            vehiculo: data.vehiculo || { color: '', marca: '', patente: '' }
          } as Ruta;
        });
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Error al cargar las solicitudes de viaje.');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  toggleRoute(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  crearNuevaRuta() {
    this.navCtrl.navigateForward('/programar-viaje');
  }

  editTrip(index: number) {
    const rutaParaEditar = this.rutas[index];
    this.navCtrl.navigateForward('/programar-viaje', { state: { ruta: rutaParaEditar } });
  }

  async cancelTrip(index: number) {
    const rutaParaCancelar = this.rutas[index];
    this.navCtrl.navigateForward('/motivo-cancelacion', { state: { rutaId: rutaParaCancelar.id } });
  }

  verDetallesSolicitud(solicitud: Ruta) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta: solicitud, esSolicitudPasajero: true } });
  }

  verDetallesViaje(ruta: Ruta) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta, esSolicitudPasajero: false } });
  }

  tomarSolicitud(solicitud: Ruta) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta: solicitud, esSolicitudPasajero: true } });
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
  
}
