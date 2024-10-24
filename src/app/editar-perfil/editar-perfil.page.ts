import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ToastService } from 'src/app/services/toast.service'; // Servicio Toast
import { LoadingController } from '@ionic/angular'; // Spinner

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
  vehiculo = {
    patente: '',
    marca: '',
    color: ''
  };

  constructor(
    private navCtrl: NavController,
    private toastService: ToastService,  // Inyectar el servicio de Toast
    private loadingCtrl: LoadingController  // Inyectar el servicio de Spinner
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
        }
      }
    } catch (error) {
      this.toastService.mostrarToast('Error al recuperar el perfil.');
    }
  }

  // Guardar los cambios en Firestore con Spinner y Toast
  async guardarCambios() {
    const loading = await this.loadingCtrl.create({
      message: 'Actualizando la información...',
      spinner: 'crescent',
      duration: 2000
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

        this.toastService.mostrarToast('Información guardada con éxito.');
        await loading.dismiss();
        this.navCtrl.navigateForward('/perfil-usuario'); //Vuelve a la página anterior
      }
    } catch (error) {
      await loading.dismiss();
      this.toastService.mostrarToast('Error al guardar los cambios.');
    }
  }
}
