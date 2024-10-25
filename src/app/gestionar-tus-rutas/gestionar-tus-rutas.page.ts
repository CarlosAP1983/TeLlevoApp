import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular'; // Importamos NavController y ToastController
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ToastService } from 'src/app/services/toast.service';  // Asegúrate de tener el ToastService implementado

@Component({
  selector: 'app-gestionar-tus-rutas',
  templateUrl: './gestionar-tus-rutas.page.html',
  styleUrls: ['./gestionar-tus-rutas.page.scss'],
})
export class GestionarTusRutasPage {
  rutas: any[] = [];

  constructor(
    private navCtrl: NavController, 
    private toastService: ToastService, // Inyectamos el ToastService para mostrar mensajes
  ) {}

  async ionViewWillEnter() {
    await this.cargarRutas();  // Aseguramos que se recargan las rutas cuando la página es visible
  }

  // Método para cargar rutas desde Firestore
  async cargarRutas() {
    try {
      const db = getFirestore();
      const rutasRef = collection(db, 'viajes');
      const querySnapshot = await getDocs(rutasRef);  // Sin filtro de conductorId
  
      this.rutas = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      if (this.rutas.length === 0) {
        this.toastService.mostrarToast('No tienes rutas registradas.');
      } else {
        this.toastService.mostrarToast('Rutas cargadas correctamente.');
      }
    } catch (error) {
      this.toastService.mostrarToast('Error al cargar las rutas.');
    }
  }
  

  // Método para redirigir a la página de creación de una nueva ruta
  crearNuevaRuta() {
    this.navCtrl.navigateForward('/programar-viaje');
  }

  // Método para editar una ruta existente
  editTrip(index: number) {
    const rutaParaEditar = this.rutas[index];
    this.navCtrl.navigateForward('/programar-viaje', { state: { ruta: rutaParaEditar } });
  }

  // Método para cancelar un viaje
  async cancelTrip(index: number) {
    const rutaParaCancelar = this.rutas[index];
    this.navCtrl.navigateForward('/motivo-cancelacion', { state: { ruta: rutaParaCancelar } });
}
}
