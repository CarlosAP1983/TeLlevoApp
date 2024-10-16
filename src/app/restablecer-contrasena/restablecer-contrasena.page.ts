import { Component } from '@angular/core';
import { getAuth,sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage {
  email: string = ''; 
  successMessage: string = ''; 
  errorMessage: string = ''; 

  constructor() {}

  // Función para enviar el enlace de restablecimiento
  async enviarEnlace() {
    
    const auth = getAuth();

    if (this.email){
       
      try{
        await sendPasswordResetEmail(auth,this.email);
        this.successMessage = 'Se ha enviado correo para restablecer contraseña';
        this.errorMessage = '';
      } catch (error){
        
      }
    }
  }
}
