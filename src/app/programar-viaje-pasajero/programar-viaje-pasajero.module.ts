import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProgramarViajePasajeroPageRoutingModule } from './programar-viaje-pasajero-routing.module';
import { ProgramarViajePasajeroPage } from './programar-viaje-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramarViajePasajeroPageRoutingModule
  ],
  declarations: [ProgramarViajePasajeroPage]
})
export class ProgramarViajePasajeroPageModule {}
