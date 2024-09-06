import { Component, OnInit } from '@angular/core';
import { NavController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = '';
  password: string = '';

  showSpinner = false; // Control de visibilidad del spinner
  destination: string = ''; // Variable para almacenar la ruta de destino

  constructor(private navCtrl: NavController, private animationCtrl: AnimationController) {}

  // Método del ciclo de vida de Angular: Se llama una vez que la vista se inicializa
  ngOnInit() {
    // Asegura que el spinner esté oculto al cargar la vista por primera vez
    this.showSpinner = false; 
  }

  // Método para manejar el inicio de sesión
  login() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]'); 
    const user = storedUsers.find(
      (u: { username: string; password: string }) =>
        u.username === this.username && u.password === this.password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.destination = '/seleccion-perfil';
      this.startSpinnerAndNavigate(); // Inicia el spinner y la navegación
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }

  // Método para manejar la navegación a la página de registro
  goToRegister() {
    this.destination = '/registro';
    this.startSpinnerAndNavigate(); // Inicia el spinner y la navegación
  }

  // Método para iniciar el spinner y controlar la navegación
  startSpinnerAndNavigate() {
    this.showSpinner = true; // Mostrar el spinner

    setTimeout(() => {
      const spinner = document.querySelector('ion-spinner');
      if (spinner) {
        spinner.classList.add('mirror-animation'); // Añadir la animación espejo al spinner
      }

      setTimeout(() => {
        this.showSpinner = false; // Ocultar el spinner justo antes de navegar

        // Verificar que el elemento ion-content existe
        const content = document.querySelector('ion-content');
        if (content) {
          // Crear una animación personalizada para el cambio de vista
          const animation = this.animationCtrl.create()
            .addElement(content)
            .duration(1000) // Duración de la animación de cambio de vista en milisegundos
            .fromTo('opacity', '1', '0');

          animation.play().then(() => {
            this.navCtrl.navigateForward(this.destination); // Navegar a la página de destino después de la animación
          });
        } else {
          // Si no se encuentra el elemento, navegar inmediatamente
          this.navCtrl.navigateForward(this.destination);
        }

      }, 900); // Duración de la animación espejo ligeramente reducida para ocultar el spinner justo antes de navegar
    }, 1500); // Tiempo de espera para mostrar el spinner
  }
}
