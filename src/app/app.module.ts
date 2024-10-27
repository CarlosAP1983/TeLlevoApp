import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importación de Firestore
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app'; // Importa initializeApp de Firebase
import { Capacitor } from '@capacitor/core'; // Importa Capacitor

// Inicialización para la plataforma web
if (!Capacitor.isNativePlatform()) {
  initializeApp(environment.firebaseConfig); // Usa la configuración de environment
  console.log('Firebase inicializado para plataforma web.');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicialización de Firebase
    AngularFireAuthModule,
    AngularFirestoreModule // Habilita Firestore
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
