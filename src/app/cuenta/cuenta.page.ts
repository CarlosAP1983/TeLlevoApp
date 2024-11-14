import { Component, OnInit } from '@angular/core'; 
import { NavController, AlertController, LoadingController } from '@ionic/angular'; // Importa AlertController y LoadingController
import { LoginService } from 'src/app/services/login.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',  
  styleUrls: ['./cuenta.page.scss'],
})

export class CuentaPage implements OnInit {  
  perfil: string = ''; 
  tieneVehiculo: boolean = false;

  constructor(
    private navCtrl: NavController, 
    private alertController: AlertController, // Inyecta AlertController
    private loadingController: LoadingController, // Inyecta LoadingController
    private loginService: LoginService,
    private firestore: AngularFirestore // Inyecta Firestore
  ) {}

  async ngOnInit() {
    // Verificar si el usuario actual tiene un vehículo registrado
    if (this.loginService.usuarioActual) {
      const userId = this.loginService.usuarioActual.uid;
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      
      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as { vehiculo?: any };
        this.tieneVehiculo = userData.vehiculo ? true : false;
      }
    }
  }

  seleccionarPerfil(tipo: string) {
    // Verifica si el usuario tiene un vehículo antes de permitir cambiar a conductor
    if (tipo === 'conductor' && !this.tieneVehiculo) {
      this.mostrarAlert('No tienes un vehículo registrado, solo puedes acceder como pasajero.');
      return;
    }
    this.perfil = tipo;
  }

  async confirmarPerfil() {
    if (this.perfil === 'conductor' && this.tieneVehiculo) {
      this.navCtrl.navigateForward('/registro-exitoso');
    } else if (this.perfil === 'pasajero') {
      this.navCtrl.navigateForward('/registro-exitoso-pasajero');
    } else {
      await this.mostrarAlert('Por favor, selecciona un perfil.');
    }
  }

  // Función para mostrar un Alert
  async mostrarAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡ALERTA!',
      message: mensaje,
      buttons: ['CONTINUAR']
    });
    await alert.present();
  }

  // Función para cerrar sesión
  async cerrarSesion() {
    // Muestra el ion-spinner durante 1.5 segundos
    const loading = await this.loadingController.create({
      spinner: 'lines-small',
      duration: 1500 
    });
    await loading.present();

    try {
      await this.loginService.logout();
      await loading.dismiss(); // Oculta el ion-spinner
      await this.mostrarAlert('Sesión cerrada correctamente.');
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      await loading.dismiss(); // Oculta el ion-spinner en caso de error
      await this.mostrarAlert('Error al cerrar sesión. Intenta nuevamente.');
    }
  }
}
