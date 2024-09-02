import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage {
  ruta: any;

  constructor(private route: ActivatedRoute) {
    // Obtener los datos de la ruta seleccionada desde el estado de navegación
    this.ruta = history.state.ruta;
  }
}
