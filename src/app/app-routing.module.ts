import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './utils/guards'; 

const routes: Routes = [
  // Rutas públicas (home y registro)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  { path: 'restablecer-contrasena', loadChildren: () => import('./restablecer-contrasena/restablecer-contrasena.module').then(m => m.RestablecerContrasenaPageModule) },

  
  {
    path: '', 
    canActivate: [authGuard], // El guard aplica a todas las rutas sin registrarse 
    children: [
      { path: 'programar-viaje', loadChildren: () => import('./programar-viaje/programar-viaje.module').then(m => m.ProgramarViajePageModule) },
      { path: 'registro-exitoso', loadChildren: () => import('./registro-exitoso/registro-exitoso.module').then(m => m.RegistroExitosoPageModule) },
      { path: 'registro-exitoso-pasajero', loadChildren: () => import('./registro-exitoso-pasajero/registro-exitoso-pasajero.module').then(m => m.RegistroExitosoPasajeroPageModule) },
      { path: 'esperando-pasajeros', loadChildren: () => import('./esperando-pasajeros/esperando-pasajeros.module').then(m => m.EsperandoPasajerosPageModule) },
      { path: 'perfil-usuario', loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule) },
      { path: 'cuenta', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaPageModule) },
      { path: 'editar-perfil', loadChildren: () => import('./editar-perfil/editar-perfil.module').then(m => m.EditarPerfilPageModule) },
      
      { path: 'detalle-viaje', loadChildren: () => import('./detalle-viaje/detalle-viaje.module').then(m => m.DetalleViajePageModule) },
      { path: 'motivo-cancelacion', loadChildren: () => import('./motivo-cancelacion/motivo-cancelacion.module').then(m => m.MotivoCancelacionPageModule) },
      { path: 'gestionar-tus-rutas', loadChildren: () => import('./gestionar-tus-rutas/gestionar-tus-rutas.module').then(m => m.GestionarTusRutasPageModule) },
      { path: 'no-hay-viajes', loadChildren: () => import('./no-hay-viajes/no-hay-viajes.module').then(m => m.NoHayViajesPageModule) },
      { path: 'seleccion-perfil', loadChildren: () => import('./seleccion-perfil/seleccion-perfil.module').then(m => m.SeleccionPerfilPageModule) },
      { path: 'contacto-chofer', loadChildren: () => import('./contacto-chofer/contacto-chofer.module').then(m => m.ContactoChoferPageModule) }
    ]
  },

  // ruta aparte para inicar sesion 
  { path: 'iniciar-sesion', loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then(m => m.IniciarSesionPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
