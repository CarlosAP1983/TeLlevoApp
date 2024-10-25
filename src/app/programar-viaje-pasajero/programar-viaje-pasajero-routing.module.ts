import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramarViajePasajeroPage } from './programar-viaje-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramarViajePasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramarViajePasajeroPageRoutingModule {}
