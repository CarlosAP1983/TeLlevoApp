import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirTarjetaPage } from './anadir-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirTarjetaPageRoutingModule {}
