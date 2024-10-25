import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from "firebase/app";
import { Capacitor } from '@capacitor/core';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importa el módulo de Firestore
import { environment } from 'src/environments/environment';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpDoVzzvdf_ZxIvnUUR7CZDNm41pwwnuE",
  authDomain: "tellevoapp-aba96.firebaseapp.com",
  projectId: "tellevoapp-aba96",
  storageBucket: "tellevoapp-aba96.appspot.com",
  messagingSenderId: "682925780025",
  appId: "1:682925780025:web:50ca71adb8fab01f07f1e8"
};

// Inicialización para la plataforma web
if (!Capacitor.isNativePlatform()) {
  initializeApp(environment.firebaseConfig);
  console.log('Firebase inicializado para plataforma web.');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule // Añade Firestore aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
