import { TestBed } from '@angular/core/testing';
import { MotivoCancelacionPage } from './motivo-cancelacion.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

describe('MotivoCancelacionPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotivoCancelacionPage], // Declarar el componente
      providers: [
        {
          provide: AngularFirestore, // Mock mínimo de AngularFirestore
          useValue: {},
        },
        {
          provide: ActivatedRoute, // Mock mínimo para ActivatedRoute
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'rutaId' ? 'mockRutaId' : null), // Retorna 'mockRutaId' para 'rutaId'
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MotivoCancelacionPage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
