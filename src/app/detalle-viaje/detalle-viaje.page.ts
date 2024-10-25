import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import * as L from 'leaflet';  // Importamos Leaflet

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  ruta: any;
  mostrarSpinner: boolean = false;
  map: any;  // Variable para el mapa

  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    // Obtener los datos de la ruta seleccionada desde el estado de navegación
    this.ruta = history.state.ruta;
  }

  ngOnInit() {
    this.loadMap();  // Cargar el mapa cuando se inicialice la página
  }

  // Función para cargar y mostrar el mapa
  loadMap() {
    if (this.ruta && this.ruta.origenLat && this.ruta.origenLng && this.ruta.destinoLat && this.ruta.destinoLng) {
      this.map = L.map('map').setView([this.ruta.origenLat, this.ruta.origenLng], 13);  // Centrar el mapa en el origen

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Marcador de origen
      L.marker([this.ruta.origenLat, this.ruta.origenLng]).addTo(this.map)
        .bindPopup('Origen')
        .openPopup();

      // Marcador de destino
      L.marker([this.ruta.destinoLat, this.ruta.destinoLng]).addTo(this.map)
        .bindPopup('Destino');
    } else {
      // Muestra un mensaje si no hay datos de coordenadas
      this.mostrarToast('No se encontraron las coordenadas de origen y destino.');
    }
  }

  // Función para mostrar toast
  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Función para manejar la acción de "Tomar viaje"
  async tomarViaje() {
    // Mostrar el spinner
    this.mostrarSpinner = true;

    // Espera 3 segundos para simular el proceso de carga
    setTimeout(async () => {
      this.mostrarSpinner = false; // Oculta el spinner después de 3 segundos

      // Redirigir a la página de contacto con el chofer
      this.navCtrl.navigateForward('/contacto-chofer', { state: { ruta: this.ruta } });
    }, 3000);
  }
}
