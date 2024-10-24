import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ToastService } from 'src/app/services/toast.service'; // Importar el servicio de Toast

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
    private toastService: ToastService // Inyectar el servicio de Toast
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

  // Función para redirigir a la página de edición del perfil
  editarPerfil() {
    this.navCtrl.navigateForward('/editar-perfil');
  }
}
