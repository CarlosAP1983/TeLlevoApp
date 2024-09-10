import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoChoferPageRoutingModule } from './contacto-chofer-routing.module';

import { ContactoChoferPage } from './contacto-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoChoferPageRoutingModule
  ],
  declarations: [ContactoChoferPage]
})
export class ContactoChoferPageModule {}
