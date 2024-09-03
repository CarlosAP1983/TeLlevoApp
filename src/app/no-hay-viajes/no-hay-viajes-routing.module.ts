import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoHayViajesPage } from './no-hay-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: NoHayViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoHayViajesPageRoutingModule {}
