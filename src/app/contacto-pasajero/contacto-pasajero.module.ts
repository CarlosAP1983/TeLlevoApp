import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoPasajeroPageRoutingModule } from './contacto-pasajero-routing.module';

import { ContactoPasajeroPage } from './contacto-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoPasajeroPageRoutingModule
  ],
  declarations: [ContactoPasajeroPage]
})
export class ContactoPasajeroPageModule {}
