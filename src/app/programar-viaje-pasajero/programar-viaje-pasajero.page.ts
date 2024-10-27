import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Ruta {
  id?: string; // Añadido como opcional
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  precio?: string;
  AsientosDisponibles?: number;
  conductorId?: string;
  conductor?: string;
}

@Component({
  selector: 'app-programar-viaje-pasajero',
  templateUrl: './programar-viaje-pasajero.page.html',
  styleUrls: ['./programar-viaje-pasajero.page.scss'],
})
export class ProgramarViajePasajeroPage implements OnInit {
  rutasDisponibles: Ruta[] = [];
  misViajesCreados: Ruta[] = [];
  rutaSeleccionada: Ruta | null = null;
  mostrarSpinner: boolean = false;
  selectedIndex: number | null = null;

  // Definir `nuevoViaje` para enlazar con el formulario en la plantilla HTML
  nuevoViaje: Ruta = {
    origen: '',
    destino: '',
    fecha: '',
    hora: '',
    precio: '',
    AsientosDisponibles: 0,
  };

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.obtenerRutasDisponibles();
    this.obtenerMisViajesCreados();
  }

  async obtenerRutasDisponibles() {
    this.mostrarSpinner = true;
    try {
      const snapshot = await this.firestore.collection('viajes').get().toPromise();
      if (!snapshot || snapshot.empty) {
        console.warn('No se encontraron rutas disponibles.');
        this.mostrarSpinner = false;
        return;
      }
      this.rutasDisponibles = snapshot.docs.map(doc => ({
        id: doc.id,  // Añadido para incluir el id de documento
        ...(doc.data() as Ruta)  // Forzar el tipo para evitar error de spread
      }));
    } catch (error) {
      console.error('Error al obtener las rutas disponibles:', error);
    }
    this.mostrarSpinner = false;
  }

  async obtenerMisViajesCreados() {
    try {
      const snapshot = await this.firestore.collection('solicitudesPasajeros').get().toPromise();
      if (!snapshot || snapshot.empty) {
        console.warn('No se encontraron viajes creados por el pasajero.');
        return;
      }
      this.misViajesCreados = snapshot.docs.map(doc => ({
        id: doc.id, // Añadido para incluir el id de documento
        ...(doc.data() as Ruta) // Forzar el tipo para evitar error de spread
      }));
    } catch (error) {
      console.error('Error al obtener los viajes creados por el pasajero:', error);
    }
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

  selectRuta(ruta: Ruta) {
    this.rutaSeleccionada = ruta;
  }

  verDetallesViaje(ruta: Ruta) {
    this.navCtrl.navigateForward('/detalle-viaje', { state: { ruta } });
  }

  recargarRutas() {
    this.obtenerRutasDisponibles();
    this.obtenerMisViajesCreados();
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
