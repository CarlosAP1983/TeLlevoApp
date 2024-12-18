import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './utils/guards';  

const routes: Routes = [
  // Ruta 'home' protegida por noAuthGuard (solo accesible para usuarios no autenticados)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [noAuthGuard] },

  // Rutas públicas
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  { path: 'restablecer-contrasena', loadChildren: () => import('./restablecer-contrasena/restablecer-contrasena.module').then(m => m.RestablecerContrasenaPageModule) },
  { path: 'iniciar-sesion', loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionPageModule) },

  // Rutas protegidas con authGuard (solo accesibles para usuarios autenticados)
  { path: 'programar-viaje', loadChildren: () => import('./programar-viaje/programar-viaje.module').then(m => m.ProgramarViajePageModule), canActivate: [authGuard] },
  { path: 'registro-exitoso', loadChildren: () => import('./registro-exitoso/registro-exitoso.module').then(m => m.RegistroExitosoPageModule), canActivate: [authGuard] },
  { path: 'registro-exitoso-pasajero', loadChildren: () => import('./registro-exitoso-pasajero/registro-exitoso-pasajero.module').then(m => m.RegistroExitosoPasajeroPageModule), canActivate: [authGuard] },
  { path: 'esperando-pasajeros', loadChildren: () => import('./esperando-pasajeros/esperando-pasajeros.module').then(m => m.EsperandoPasajerosPageModule), canActivate: [authGuard] },
  { path: 'perfil-usuario', loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule), canActivate: [authGuard] },
  { path: 'cuenta', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaPageModule), canActivate: [authGuard] },
  { path: 'seleccion-perfil', loadChildren: () => import('./seleccion-perfil/seleccion-perfil.module').then(m => m.SeleccionPerfilPageModule), canActivate: [authGuard] },
  { path: 'editar-perfil', loadChildren: () => import('./editar-perfil/editar-perfil.module').then(m => m.EditarPerfilPageModule), canActivate: [authGuard] },
  { path: 'gestionar-tus-rutas', loadChildren: () => import('./gestionar-tus-rutas/gestionar-tus-rutas.module').then(m => m.GestionarTusRutasPageModule), canActivate: [authGuard] },
  { path: 'detalle-viaje', loadChildren: () => import('./detalle-viaje/detalle-viaje.module').then(m => m.DetalleViajePageModule), canActivate: [authGuard] },
  { path: 'programar-viaje-pasajero',loadChildren: () => import('./programar-viaje-pasajero/programar-viaje-pasajero.module').then(m => m.ProgramarViajePasajeroPageModule), canActivate: [authGuard] },
  { path: 'motivo-cancelacion',loadChildren: () => import('./motivo-cancelacion/motivo-cancelacion.module').then(m => m.MotivoCancelacionPageModule), canActivate: [authGuard] },
  { path: 'esperando-pasajeros', loadChildren: () => import('./esperando-pasajeros/esperando-pasajeros.module').then(m => m.EsperandoPasajerosPageModule), canActivate: [authGuard] },
  { path: 'contacto-chofer', loadChildren: () => import('./contacto-chofer/contacto-chofer.module').then(m => m.ContactoChoferPageModule), canActivate: [authGuard] },
  {
    path: 'contacto-pasajero',
    loadChildren: () => import('./contacto-pasajero/contacto-pasajero.module').then( m => m.ContactoPasajeroPageModule)
  },  {
    path: 'anadir-tarjeta',
    loadChildren: () => import('./anadir-tarjeta/anadir-tarjeta.module').then( m => m.AnadirTarjetaPageModule)
  },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }