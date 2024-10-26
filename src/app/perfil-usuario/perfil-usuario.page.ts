import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ToastService } from 'src/app/services/toast.service'; // Importar el servicio de Toast
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

  constructor(
    private navCtrl: NavController,
    private toastService: ToastService, // Inyectar el servicio de Toast
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
          
          // Verificar si tiene vehículo o no y mostrar el mensaje correspondiente
          this.tipoUsuario = userData['vehiculo'] 
            ? 'Usuario cuenta con vehículo registrado' 
            : 'Usuario no cuenta con vehículo registrado';
        }
      }
    } catch (error) {
      this.toastService.mostrarToast('Error al recuperar los datos del perfil.');
    }
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
          this.toastService.mostrarToast('Imagen de perfil actualizada exitosamente.');
        });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      this.toastService.mostrarToast('Error al subir la imagen de perfil.');
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
      this.toastService.mostrarToast('Error al actualizar el perfil con la nueva imagen.');
    }
  }
  editarPerfil() {
    this.navCtrl.navigateForward('/editar-perfil');
  }
}
