import { Component, Injectable } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController para la navegación
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {
  username: string = ''; 
  password: string = ''; 

  constructor(private navCtrl: NavController) {}

  // Método de inicio de sesión
  async onLogin() {
    const auth = getAuth(); 
    try{
      const userCredential = await signInWithEmailAndPassword(auth, this.username, this.password);
      console.log('Sesión iniciada:',userCredential);
      
      
      //A QUE PÁGINA LLEVAREMOS? NO RECUERDO, REVISAR ESTO
      

    }catch (error){
      console.error('error al inicar sesión',error);
      alert('usuario o contraseña incorrecta');
    } 

    
}
}
