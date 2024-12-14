import { TestBed } from '@angular/core/testing';
import { CuentaPage } from './cuenta.page';
import { LoginService } from 'src/app/services/login.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('CuentaPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuentaPage], // Declarar el componente
      providers: [
        {
          provide: LoginService, // Mock de LoginService
          useValue: {
            loginStatus$: { subscribe: jasmine.createSpy('subscribe') }, // Mock del observable loginStatus$
          },
        },
        {
          provide: AngularFirestore, // Mock de AngularFirestore
          useValue: {}, // Mock vacío
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CuentaPage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
