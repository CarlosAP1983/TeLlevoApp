import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoChoferPage } from './contacto-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: ContactoChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoChoferPageRoutingModule {}

