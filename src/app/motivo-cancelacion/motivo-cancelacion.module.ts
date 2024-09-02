import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotivoCancelacionPageRoutingModule } from './motivo-cancelacion-routing.module';

import { MotivoCancelacionPage } from './motivo-cancelacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotivoCancelacionPageRoutingModule
  ],
  declarations: [MotivoCancelacionPage]
})
export class MotivoCancelacionPageModule {}
