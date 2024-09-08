import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage {
  ruta: any;

  constructor(private route: ActivatedRoute, private toastCtrl: ToastController) {
    // Obtener los datos de la ruta seleccionada desde el estado de navegación
    this.ruta = history.state.ruta;
  }

  // Función para manejar la acción de "Tomar viaje"
  async tomarViaje() {
    // Lógica para tomar el viaje (puedes implementar lo que necesites aquí)
    console.log('Viaje tomado:', this.ruta);

    // Mostrar un Toast de confirmación
    const toast = await this.toastCtrl.create({
      message: 'Has tomado el viaje con éxito.',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }
}
