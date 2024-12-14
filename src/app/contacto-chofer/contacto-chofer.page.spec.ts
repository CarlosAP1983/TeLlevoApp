import { TestBed } from '@angular/core/testing';
import { ContactoChoferPage } from './contacto-chofer.page';
import { ActivatedRoute } from '@angular/router';

describe('ContactoChoferPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactoChoferPage], // Declarar el componente
      providers: [
        {
          provide: ActivatedRoute, // Proveer un mock para ActivatedRoute
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'ruta' ? 'mockRuta' : null), // Simular un valor para 'ruta'
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactoChoferPage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
