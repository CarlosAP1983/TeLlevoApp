import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'programar-viaje',
    loadChildren: () => import('./programar-viaje/programar-viaje.module').then( m => m.ProgramarViajePageModule)
  },  {
    path: 'registro-exitoso',
    loadChildren: () => import('./registro-exitoso/registro-exitoso.module').then( m => m.RegistroExitosoPageModule)
  },
  {
    path: 'esperando-pasajeros',
    loadChildren: () => import('./esperando-pasajeros/esperando-pasajeros.module').then( m => m.EsperandoPasajerosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
