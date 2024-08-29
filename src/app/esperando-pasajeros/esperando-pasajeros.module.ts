import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsperandoPasajerosPageRoutingModule } from './esperando-pasajeros-routing.module';

import { EsperandoPasajerosPage } from './esperando-pasajeros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsperandoPasajerosPageRoutingModule
  ],
  declarations: [EsperandoPasajerosPage]
})
export class EsperandoPasajerosPageModule {}
