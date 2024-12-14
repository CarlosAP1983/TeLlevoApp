import { TestBed } from '@angular/core/testing';
import { ProgramarViajePage } from './programar-viaje.page';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('ProgramarViajePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramarViajePage], // Declarar el componente
      imports: [HttpClientModule], // Importar HttpClientModule para HttpClient
      providers: [
        {
          provide: AngularFirestore, // Proveer un mock de AngularFirestore
          useValue: {}, // Mock vacío
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProgramarViajePage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
