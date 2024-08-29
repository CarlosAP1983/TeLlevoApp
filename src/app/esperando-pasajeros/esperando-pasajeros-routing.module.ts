import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsperandoPasajerosPage } from './esperando-pasajeros.page';

const routes: Routes = [
  {
    path: '',
    component: EsperandoPasajerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsperandoPasajerosPageRoutingModule {}
