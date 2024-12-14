import { TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para habilitar ngForm

describe('RegistroPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage], // Declarar el componente
      imports: [FormsModule], // Importar FormsModule para ngForm
      providers: [
        {
          provide: AngularFirestore, // Proveer un mock mínimo de AngularFirestore
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegistroPage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
