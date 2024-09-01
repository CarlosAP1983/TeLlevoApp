import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { RegistroExitosoPasajeroPage } from './registro-exitoso-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RegistroExitosoPasajeroPage }])
  ],
  declarations: [RegistroExitosoPasajeroPage]
})
export class RegistroExitosoPasajeroPageModule {}
