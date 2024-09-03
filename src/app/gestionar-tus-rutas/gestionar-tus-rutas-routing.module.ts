import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionarTusRutasPage } from './gestionar-tus-rutas.page';

const routes: Routes = [
  {
    path: '',
    component: GestionarTusRutasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarTusRutasPageRoutingModule {}
