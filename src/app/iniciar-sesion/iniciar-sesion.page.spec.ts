import { TestBed } from '@angular/core/testing';
import { IniciarSesionPage } from './iniciar-sesion.page';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngForm

describe('IniciarSesionPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IniciarSesionPage], // Declarar el componente
      imports: [FormsModule], // Importar FormsModule
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(IniciarSesionPage); // Crear instancia del componente
    const component = fixture.componentInstance;
    expect(component).toBeTruthy(); // Verificar que el componente se haya creado correctamente
  });
});
