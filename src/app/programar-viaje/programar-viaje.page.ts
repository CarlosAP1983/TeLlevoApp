import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ComunasService } from '../services/comunas.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage implements OnInit {
  nuevoViaje = {
    origen: '',
    destino: '',
    fechaHora: '',  // Campo combinado de fecha y hora
    precio: '',
    asientos: 1
  };

  comunas: any[] = [];
  comunasFiltradas: any[] = [];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private comunasService: ComunasService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.obtenerComunas();
  }

  obtenerComunas() {
    this.comunasService.obtenerComunas().subscribe(
      (data) => {
        this.comunas = data;
        this.comunasFiltradas = data;
        console.log("Datos de comunas:", this.comunas);
      },
      (error) => {
        console.error('Error al obtener comunas:', error);
      }
    );
  }

  async guardarViaje() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando datos...',
      duration: 2000
    });

    await loading.present();

    try {
      await this.firestore.collection('viajes').add(this.nuevoViaje);

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
