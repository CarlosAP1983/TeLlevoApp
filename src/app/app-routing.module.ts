import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Página inicial por defecto
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'programar-viaje', // Página que se puede usar como "vista principal"
    loadChildren: () => import('./programar-viaje/programar-viaje.module').then(m => m.ProgramarViajePageModule)
  },
  {
    path: 'registro-exitoso',
    loadChildren: () => import('./registro-exitoso/registro-exitoso.module').then(m => m.RegistroExitosoPageModule)
  },
  {
    path: 'registro-exitoso-pasajero', // Usar guiones en lugar de guiones bajos
    loadChildren: () => import('./registro-exitoso-pasajero/registro-exitoso-pasajero.module').then(m => m.RegistroExitosoPasajeroPageModule)
  },
  {
    path: 'esperando-pasajeros',
    loadChildren: () => import('./esperando-pasajeros/esperando-pasajeros.module').then(m => m.EsperandoPasajerosPageModule)
  },
  {
    path: 'iniciar-sesion', // Página de iniciar sesión
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
