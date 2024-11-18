import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionPage } from './iniciar-sesion.page';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('IniciarSesionPage', () => {
  let component: IniciarSesionPage;
  let fixture: ComponentFixture<IniciarSesionPage>;
  let mockNavController: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    mockNavController = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [IniciarSesionPage],
      imports: [FormsModule], // Importa FormsModule para soportar ngModel
      providers: [
        { provide: NavController, useValue: mockNavController },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Soporta componentes personalizados de Ionic
    }).compileComponents();

    fixture = TestBed.createComponent(IniciarSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an alert on login failure', async () => {
    spyOn(window, 'alert'); // Simula la función `alert`
  
    await component.onLogin();
  
    expect(window.alert).toHaveBeenCalledWith('usuario o contraseña incorrecta');
  });
  
});
