import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { AlertController } from '@ionic/angular'; // Importar el AlertController
import { StorageService } from '../services/storage.service';
import { updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  avatar: string = 'assets/images/avatar.jpg'; 
  nombre: string = ''; 
  telefono: string = ''; 
  email: string = ''; 
  tipoUsuario: string = '';  // Texto para mostrar si el usuario tiene vehículo o no
  alertaMostrada: boolean = false; // Variable para evitar alertas duplicadas

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController, // Inyectar el AlertController
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  ionViewWillEnter() {
    this.getUserProfile();  // Volvemos a cargar los datos cuando el usuario regresa a esta página
  }

  // Función para recuperar datos de perfil desde Firestore
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
          this.avatar = userData['avatar'] || this.avatar;
          
          this.tipoUsuario = userData['vehiculo'] 
            ? 'Usuario cuenta con vehículo registrado' 
            : 'Usuario no cuenta con vehículo registrado';
          
          this.alertaMostrada = false; // Restablece el estado si los datos se cargan con éxito
        }
      }
    } catch (error) {
      if (!this.alertaMostrada) {
        this.mostrarAlerta('Error', 'Error al recuperar los datos del perfil.');
        this.alertaMostrada = true; // Marca que se mostró la alerta
      }
    }
  }

  // Método para mostrar la alerta en caso de error
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onSelectFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async () => {
      const file = fileInput.files![0];
      if (file) {
        await this.uploadImage(file); // Llama a uploadImage cuando se selecciona un archivo
      }
    };

    fileInput.click(); // Simula el clic para abrir el selector de archivos
  }

  // Método para subir la imagen seleccionada
  async uploadImage(file: File) {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        this.storageService.uploadProfileImage(file, user.uid).subscribe(url => {
          this.avatar = url; // Actualiza la URL del avatar con la URL de descarga
          this.updateUserProfile(url); // Guarda la URL en Firestore
          this.mostrarAlerta('Éxito', 'Imagen de perfil actualizada exitosamente.');
        });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      this.mostrarAlerta('Error', 'Error al subir la imagen de perfil.');
    }
  }

  // Función para actualizar el perfil del usuario en Firestore con la URL del avatar
  async updateUserProfile(url: string) {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
  
        await updateDoc(docRef, {
          avatar: url
        });
  
        console.log('Perfil actualizado con la URL del avatar.');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      this.mostrarAlerta('Error', 'Error al actualizar el perfil con la nueva imagen.');
    }
  }

  editarPerfil() {
    this.navCtrl.navigateForward('/editar-perfil');
  }
}
