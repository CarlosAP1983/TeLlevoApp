import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from "firebase/app";
import { Capacitor } from '@capacitor/core';  


const firebaseConfig = {
  apiKey: "AIzaSyDpDoVzzvdf_ZxIvnUUR7CZDNm41pwwnuE",
  authDomain: "tellevoapp-aba96.firebaseapp.com",
  projectId: "tellevoapp-aba96",
  storageBucket: "tellevoapp-aba96.appspot.com",
  messagingSenderId: "682925780025",
  appId: "1:682925780025:web:50ca71adb8fab01f07f1e8"
};


if (!Capacitor.isNativePlatform()) {
  initializeApp(firebaseConfig);
  console.log('Firebase inicializado para plataforma web.');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
