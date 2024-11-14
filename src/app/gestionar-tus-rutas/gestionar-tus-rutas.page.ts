import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-gestionar-tus-rutas',
  templateUrl: './gestionar-tus-rutas.page.html',
  styleUrls: ['./gestionar-tus-rutas.page.scss'],
})
export class GestionarTusRutasPage {
  rutas: any[] = [];
  solicitudesViaje: any[] = [];
  selectedIndex: number | null = null;
  mostrarSpinner: boolean = false;
  rutaSeleccionada: any | null = null;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private firestore: AngularFirestore
  ) {}

  async ionViewWillEnter() {
    this.mostrarSpinner = true;
    await this.cargarRutas();
    await this.cargarSolicitudesViaje();
    this.mostrarSpinner = false;
  }

  async cargarRutas() {
    try {
      const rutasRef = this.firestore.collection('viajes');
      const snapshot = await rutasRef.get().toPromise();
  
      if (snapshot && !snapshot.empty) {
        this.rutas = snapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...(data ? data : {}) };
        });
        this.mostrarAlerta('Éxito', 'Rutas cargadas correctamente.');
      } else {
        this.mostrarAlerta('Información', 'No tienes rutas registradas.');
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
          const data = doc.data();
          return { id: doc.id, ...(data ? data : {}) };
        });
        this.mostrarAlerta('Éxito', 'Solicitudes cargadas correctamente.');
      } else {
        this.mostrarAlerta('Información', 'No hay solicitudes de viaje.');
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

  verDetallesSolicitud(solicitud: any) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta: solicitud, esSolicitudPasajero: true } });
  }

  verDetallesViaje(ruta: any) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta, esSolicitudPasajero: false } });
  }

  tomarSolicitud(solicitud: any) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta: solicitud, esSolicitudPasajero: true } });
  }
}
