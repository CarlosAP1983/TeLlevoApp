import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as L from 'leaflet'; // Importar Leaflet
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-programar-viaje-pasajero',
  templateUrl: './programar-viaje-pasajero.page.html',
  styleUrls: ['./programar-viaje-pasajero.page.scss'],
})
export class ProgramarViajePasajeroPage implements OnInit {

  direccionDestino: string = '';
  direccionOrigen: string = '';
  map: any;

  @ViewChild('map', { static: false }) mapContainer!: ElementRef;

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    // Inicializar el mapa al cargar la vista
    this.loadMap();
  }

  // Método para buscar la dirección de destino en el mapa
  async buscarDireccionDestino() {
    if (!this.direccionDestino) {
      const toast = await this.toastController.create({
        message: 'Por favor, ingresa una dirección de destino.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    // Aquí puedes usar una API de geocoding para obtener las coordenadas basadas en la dirección ingresada
    // Por ahora, simularemos con coordenadas de ejemplo
    const coordenadasDestino: [number, number] = [51.505, -0.09]; // Ejemplo: Londres

    const marker = L.marker(coordenadasDestino).addTo(this.map);
    this.map.setView(coordenadasDestino, 15);

    const toast = await this.toastController.create({
      message: `Ubicación de destino encontrada: ${this.direccionDestino}`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  // Método para obtener la ubicación actual del usuario
  async obtenerUbicacionActual() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lng = coordinates.coords.longitude;

    // Actualizar la dirección origen con las coordenadas actuales
    this.direccionOrigen = `Latitud: ${lat}, Longitud: ${lng}`;

    const marker = L.marker([lat, lng]).addTo(this.map);
    this.map.setView([lat, lng], 15);

    const toast = await this.toastController.create({
      message: `Ubicación actual obtenida: ${this.direccionOrigen}`,
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  // Método para cargar el mapa principal
  loadMap() {
    this.map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.map);
  }

  // Método para guardar los datos
  async guardarDatos() {
    const toast = await this.toastController.create({
      message: `Datos guardados: Origen - ${this.direccionOrigen}, Destino - ${this.direccionDestino}`,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }
}
