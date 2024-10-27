import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoPasajeroPage } from './contacto-pasajero.page';

const routes: Routes = [
  {
    path: '',
    component: ContactoPasajeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoPasajeroPageRoutingModule {}
