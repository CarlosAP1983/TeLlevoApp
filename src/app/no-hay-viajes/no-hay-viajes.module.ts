import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoHayViajesPageRoutingModule } from './no-hay-viajes-routing.module';

import { NoHayViajesPage } from './no-hay-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoHayViajesPageRoutingModule
  ],
  declarations: [NoHayViajesPage]
})
export class NoHayViajesPageModule {}
