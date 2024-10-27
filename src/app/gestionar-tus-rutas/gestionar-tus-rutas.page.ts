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
  selectedIndex: number | null = null; // Índice del elemento seleccionado

  constructor(
    private navCtrl: NavController, 
    private toastService: ToastService,
    private firestore: AngularFirestore // Confirma que Firestore está correctamente inyectado
  ) {}

  async ionViewWillEnter() {
    await this.cargarRutas();
  }

  // Método para cargar rutas desde Firestore
  async cargarRutas() {
    try {
      const rutasRef = this.firestore.collection('viajes');
      const snapshot = await rutasRef.get().toPromise();
  
      if (snapshot && !snapshot.empty) {
        this.rutas = snapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...(data ? data : {}) }; // Si data es null, usa un objeto vacío
        });
        
        this.toastService.mostrarToast('Rutas cargadas correctamente.');
      } else {
        this.toastService.mostrarToast('No tienes rutas registradas.');
      }
    } catch (error) {
      this.toastService.mostrarToast('Error al cargar las rutas.');
    }
  }
  
  

  // Método para seleccionar una ruta
  selectRoute(index: number) {
    this.selectedIndex = index;
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
    this.navCtrl.navigateForward('/motivo-cancelacion', { state: { rutaId: rutaParaCancelar.id } });
  }
}
