import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroExitosoPasajeroPage } from './registro-exitoso-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroExitosoPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroExitosoPasajeroPageRoutingModule {}
