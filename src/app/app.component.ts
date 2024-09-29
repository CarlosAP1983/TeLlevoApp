import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  async NgOnInit(){
    //veremos si no estamos en un celular
    if(!Capacitor.isNativePlatform()){


      const firebaseConfig = {

        apiKey: "AIzaSyDpDoVzzvdf_ZxIvnUUR7CZDNm41pwwnuE",      
        authDomain: "tellevoapp-aba96.firebaseapp.com",      
        projectId: "tellevoapp-aba96",      
        storageBucket: "tellevoapp-aba96.appspot.com",      
        messagingSenderId: "682925780025",      
        appId: "1:682925780025:web:50ca71adb8fab01f07f1e8"
      
      };
            
      // Initialize Firebase      
      initializeApp(firebaseConfig);
      console.log()
    }
  }

}
