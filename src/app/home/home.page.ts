import { Component, inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  password: string = '';

  destination: string = ''; 
  loginSrv = inject(LoginService);
  
  

  constructor(private navCtrl: NavController) {}

  //Metodo del ciclo de vida de Angular, se llama una vez que la vista se inicializa
  ngOnInit() {}

  //Metodo para manejar el inicio de sesion
  login() {
   
      this.loginSrv.login(this.username,this.password);
      this.navCtrl.navigateForward('/seleccion-perfil'); //Si tiene cuenta pasa a la vista seleccion-perfil
      
    } 
  

  //Metodo para pasar a la pagina registro
  goToRegister() {
    this.navCtrl.navigateForward('/registro'); //Pasa a la vista registro
  }
  
}
