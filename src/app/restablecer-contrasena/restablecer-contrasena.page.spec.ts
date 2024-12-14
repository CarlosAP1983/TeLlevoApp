import { TestBed } from '@angular/core/testing';
import { RestablecerContrasenaPage } from './restablecer-contrasena.page';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngForm
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importar AngularFirestore

describe('RestablecerContrasenaPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestablecerContrasenaPage], // Declarar el componente
      imports: [FormsModule], // Importar FormsModule para habilitar ngForm
      providers: [
        {
          provide: AngularFirestore, // Mock de AngularFirestore
          useValue: {}, // Mock vacío
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RestablecerContrasenaPage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
