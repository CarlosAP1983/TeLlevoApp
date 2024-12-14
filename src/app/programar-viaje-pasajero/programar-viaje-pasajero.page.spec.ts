import { TestBed } from '@angular/core/testing';
import { ProgramarViajePasajeroPage } from './programar-viaje-pasajero.page';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('ProgramarViajePasajeroPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramarViajePasajeroPage], // Declarar el componente
      imports: [HttpClientModule], // Importar HttpClientModule para resolver HttpClient
      providers: [
        {
          provide: AngularFirestore, // Mock de AngularFirestore
          useValue: {}, // Mock vacío
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramarViajePasajeroPage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
