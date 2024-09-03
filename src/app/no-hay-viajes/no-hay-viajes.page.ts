import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-no-hay-viajes',
  templateUrl: './no-hay-viajes.page.html',
  styleUrls: ['./no-hay-viajes.page.scss'],
})
export class NoHayViajesPage {
  constructor(private alertController: AlertController) {}

  async onSearch(event: any) {
    
    const query = event.target.value;

    
    const alert = await this.alertController.create({
      header: 'Resultado de la Búsqueda',
      message: 'No hay viajes disponibles.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
