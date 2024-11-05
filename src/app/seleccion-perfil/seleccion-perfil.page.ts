import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-seleccion-perfil',
  templateUrl: './seleccion-perfil.page.html',
  styleUrls: ['./seleccion-perfil.page.scss'],
})
export class SeleccionPerfilPage implements OnInit {

  nombreUsuario: string | null = null;
  perfil: string | null = null;
  tieneVehiculo: boolean = false;

  constructor(
    private navCtrl: NavController,
    public loginSrv: LoginService,
    private alertController: AlertController,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    const correoCompleto = this.loginSrv.getNombreUsuario();
    if (correoCompleto) {
      this.nombreUsuario = correoCompleto.split('@')[0];
    } else {
      this.nombreUsuario = null;
    }

    // Obtener datos del usuario desde Firestore para verificar si tiene vehículo
    if (this.loginSrv.usuarioActual) {
      const userId = this.loginSrv.usuarioActual.uid;
      try {
        const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
        
        if (userDoc && userDoc.exists) {
          const userData = userDoc.data() as { vehiculo?: any };
          this.tieneVehiculo = userData?.vehiculo ? true : false;
        } else {
          this.tieneVehiculo = false;
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        this.tieneVehiculo = false;
      }
    }
  }

  seleccionarPerfil(tipo: string) {
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

  async mostrarAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: '¡ALERTA!',
      message: mensaje,
      buttons: ['CONTINUAR']
    });
    await alert.present();
  }
}
