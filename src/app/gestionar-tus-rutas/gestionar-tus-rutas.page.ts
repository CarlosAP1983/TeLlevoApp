import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-gestionar-tus-rutas',
  templateUrl: './gestionar-tus-rutas.page.html',
  styleUrls: ['./gestionar-tus-rutas.page.scss'],
})
export class GestionarTusRutasPage {
  rutas: any[] = [];
  solicitudesViaje: any[] = []; // Array para almacenar las solicitudes de viaje
  selectedIndex: number | null = null;

  constructor(
    private navCtrl: NavController, 
    private toastService: ToastService,
    private firestore: AngularFirestore
  ) {}

  async ionViewWillEnter() {
    await this.cargarRutas();
    await this.cargarSolicitudesViaje(); // Cargar solicitudes de viaje al iniciar
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
        this.toastService.mostrarToast('Rutas cargadas correctamente.');
      } else {
        this.toastService.mostrarToast('No tienes rutas registradas.');
      }
    } catch (error) {
      this.toastService.mostrarToast('Error al cargar las rutas.');
    }
  }

  // Método para cargar las solicitudes de viaje desde Firestore
  async cargarSolicitudesViaje() {
    try {
      const solicitudesRef = this.firestore.collection('solicitudesPasajeros');
      const snapshot = await solicitudesRef.get().toPromise();
  
      if (snapshot && !snapshot.empty) {
        this.solicitudesViaje = snapshot.docs.map(doc => doc.data());
        this.toastService.mostrarToast('Solicitudes cargadas correctamente.');
      } else {
        this.toastService.mostrarToast('No hay solicitudes de viaje.');
      }
    } catch (error) {
      this.toastService.mostrarToast('Error al cargar las solicitudes de viaje.');
    }
  }

  selectRoute(index: number) {
    this.selectedIndex = index;
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
    this.navCtrl.navigateForward('/detalle-solicitud', { state: { solicitud } });
  }
}
