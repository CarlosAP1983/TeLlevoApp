import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  nombre: string = '';
  telefono: string = '';
  email: string = '';
  tieneVehiculo: boolean = false;
  tarjetaRegistrada: boolean = false;
  vehiculo = {
    patente: '',
    marca: '',
    color: ''
  };

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  // Recuperar los datos del usuario actual desde Firestore
  async getUserProfile() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          this.nombre = userData['name'];
          this.telefono = userData['phone'];
          this.email = userData['email'];
          
          if (userData['vehiculo']) {
            this.tieneVehiculo = true;
            this.vehiculo.patente = userData['vehiculo'].patente;
            this.vehiculo.marca = userData['vehiculo'].marca;
            this.vehiculo.color = userData['vehiculo'].color;
          }
          
          // Verificar si hay una tarjeta registrada
          this.tarjetaRegistrada = !!userData['tarjeta'];
        }
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Error al recuperar el perfil.');
    }
  }

  // Guardar los cambios en Firestore con Spinner y Alert
  async guardarCambios() {
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando la información...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);

        const userData: any = {
          name: this.nombre,
          phone: this.telefono,
          email: this.email
        };

        if (this.tieneVehiculo) {
          userData.vehiculo = {
            patente: this.vehiculo.patente,
            marca: this.vehiculo.marca,
            color: this.vehiculo.color
          };
        }

        await updateDoc(docRef, userData);

        await loading.dismiss();
        this.mostrarAlerta('Éxito', 'Información guardada con éxito.');
        this.navCtrl.navigateForward('/perfil-usuario');
      }
    } catch (error) {
      await loading.dismiss();
      this.mostrarAlerta('Error', 'Error al guardar los cambios.');
    }
  }

  // Método para mostrar una alerta
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para navegar a la vista de añadir/editar tarjeta
  goToAnadirTarjeta() {
    this.navCtrl.navigateForward('/anadir-tarjeta');
  }
}
