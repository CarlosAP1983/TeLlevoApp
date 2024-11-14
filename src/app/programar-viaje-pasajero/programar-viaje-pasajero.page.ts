import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ComunasService } from '../services/comunas.service';

interface Ruta {
  origen: string;
  destino: string;
  fechaHora: string; // Almacena tanto fecha como hora en un solo campo
}

@Component({
  selector: 'app-programar-viaje-pasajero',
  templateUrl: './programar-viaje-pasajero.page.html',
  styleUrls: ['./programar-viaje-pasajero.page.scss'],
})
export class ProgramarViajePasajeroPage implements OnInit {
  nuevoViaje: Ruta = {
    origen: '',
    destino: '',
    fechaHora: '' // Cambiado para usar un solo campo de fecha y hora
  };
  comunas: any[] = []; // Array para almacenar las comunas obtenidas desde la API

  constructor(
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private comunasService: ComunasService // Servicio para obtener las comunas
  ) {}

  ngOnInit() {
    this.obtenerComunas(); // Cargar comunas al iniciar la página
  }

  obtenerComunas() {
    this.comunasService.obtenerComunas().subscribe(
      (data) => {
        this.comunas = data;
        console.log("Comunas obtenidas:", this.comunas);
      },
      (error) => {
        console.error('Error al obtener comunas:', error);
      }
    );
  }

  async crearSolicitud() {
    try {
      await this.firestore.collection('solicitudesPasajeros').add(this.nuevoViaje);
      const toast = await this.toastCtrl.create({
        message: 'Solicitud de viaje creada exitosamente.',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al crear solicitud de viaje:', error);
      const toast = await this.toastCtrl.create({
        message: 'Error al crear la solicitud de viaje.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
