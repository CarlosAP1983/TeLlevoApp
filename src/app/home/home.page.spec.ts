import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { NavController, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  const mockUserCredential = {
    user: {
      uid: '123456',
      email: 'test@test.com',
    },
  } as any; // Simulación básica del objeto UserCredential

  beforeEach(async () => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    } as any));

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: AlertController, useValue: alertControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "registro" when irARegistro is called', () => {
    component.irARegistro();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith('/registro');
  });

  it('should show alert if username or password is missing during login', async () => {
    component.nombreUsuario = '';
    component.contrasena = '';
    await component.iniciarSesion();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'ERROR DE INGRESO',
      message: 'Por favor, ingresa tu usuario y contraseña.',
      buttons: ['CONTINUAR'],
    });
  });

  it('should call login and navigate to "seleccion-perfil" on successful login', async () => {
    component.nombreUsuario = 'testUser';
    component.contrasena = 'testPassword';
    loginServiceSpy.login.and.returnValue(Promise.resolve(mockUserCredential));

    await component.iniciarSesion();

    expect(loginServiceSpy.login).toHaveBeenCalledWith('testUser', 'testPassword');
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith('/seleccion-perfil');
  });

  it('should show alert if login fails', async () => {
    component.nombreUsuario = 'testUser';
    component.contrasena = 'wrongPassword';
    loginServiceSpy.login.and.returnValue(Promise.reject(new Error('Invalid credentials')));

    await component.iniciarSesion();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'ERROR DE INGRESO',
      message: 'Usuario o contraseña incorrecta.',
      buttons: ['CONTINUAR'],
    });
  });
});
