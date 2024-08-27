import { Component } from '@angular/core';

interface Auto {
  nombre: string;
  disponible: boolean;
  avatar: string;
}

@Component({
  selector: 'app-programar-viaje',
  templateUrl: './programar-viaje.page.html',
  styleUrls: ['./programar-viaje.page.scss'],
})
export class ProgramarViajePage {

  titulo = 'Programar un Viaje';
  mostrarDisponibles = true;
  mostrarNoDisponibles = true;

  autos: Auto[] = [
    { nombre: 'Toyota Corolla', disponible: true, avatar: 'assets/images/toyota_corolla.jpg' },
    { nombre: 'Ford Fiesta', disponible: false, avatar: 'assets/images/ford_fiesta.jpg' },
    { nombre: 'Honda Civic', disponible: true, avatar: 'assets/images/honda_civic.jpg' },
    { nombre: 'Chevrolet Spark', disponible: false, avatar: 'assets/images/chevrolet_spark.jpg' },
  ];

  obtenerAvatar(auto: Auto): string {
    return auto.avatar;
  }
}
