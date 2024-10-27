import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ComunasService } from '../services/comunas.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage implements OnInit {
  nuevoViaje = {
    origen: '',
    destino: '',
    fecha: '',
    hora: '',
    precio: '',
    asientos: 1
  };

  comunas: any[] = []; // Lista completa de comunas
  comunasFiltradas: any[] = []; // Lista filtrada para búsqueda en el selector

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private comunasService: ComunasService,
    private firestore: AngularFirestore // Inyección de AngularFirestore
  ) {}

  selectOptions = {
    header: 'Selecciona Comuna',
    subHeader: 'Escribe para buscar', // Muestra el texto "Escribe para buscar" en el desplegable
    cssClass: 'comuna-select'
  };

  ngOnInit() {
    this.obtenerComunas();
  }

  obtenerComunas() {
    this.comunasService.obtenerComunas().subscribe(
      (data) => {
        this.comunas = data;
        this.comunasFiltradas = data; // Inicialmente muestra todas las comunas en el filtro
        console.log("Datos de comunas:", this.comunas); // Verificar los datos aquí
      },
      (error) => {
        console.error('Error al obtener comunas:', error);
      }
    );
  }   

  filtrarComunas(event: any) {
    const texto = event.target.value.toLowerCase();
    if (texto && texto.trim() !== '') {
      this.comunasFiltradas = this.comunas.filter(comuna =>
        comuna.nombre.toLowerCase().includes(texto)
      );
    } else {
      this.comunasFiltradas = [...this.comunas]; // Restaura la lista completa si el texto está vacío
    }
  }

  async guardarViaje() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando datos...',
      duration: 2000
    });

    await loading.present();

    try {
      await this.firestore.collection('viajes').add(this.nuevoViaje); // Agrega el documento a la colección "viajes"

      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Viaje guardado exitosamente.',
        duration: 2000,
        color: 'dark',
        position: 'middle',
        cssClass: 'custom-toast'
      });
      await toast.present();

      this.navCtrl.navigateBack('/registro-exitoso');
    } catch (error) {
      loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'Error al guardar el viaje.',
        duration: 2000,
        color: 'danger',
        position: 'middle'
      });
      await toast.present();
    }
  }
}
