import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirTarjetaPageRoutingModule } from './anadir-tarjeta-routing.module';

import { AnadirTarjetaPage } from './anadir-tarjeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirTarjetaPageRoutingModule
  ],
  declarations: [AnadirTarjetaPage]
})
export class AnadirTarjetaPageModule {}
