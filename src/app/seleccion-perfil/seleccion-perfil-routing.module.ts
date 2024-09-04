import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionPerfilPage } from './seleccion-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionPerfilPageRoutingModule {}
