import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotivoCancelacionPage } from './motivo-cancelacion.page';

const routes: Routes = [
  {
    path: '',
    component: MotivoCancelacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotivoCancelacionPageRoutingModule {}
