import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, AlertController, LoadingController } from '@ionic/angular';
import { CuentaPage } from './cuenta.page';
import { LoginService } from 'src/app/services/login.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('CuentaPage', () => {
  let component: CuentaPage;
  let fixture: ComponentFixture<CuentaPage>;

  // Mock para LoginService
  const mockLoginService = {
    usuarioActual: { uid: 'testUID' },
    logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve()),
  };

  // Mock para AngularFirestore
  const mockFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({
      doc: jasmine.createSpy('doc').and.returnValue({
        get: jasmine.createSpy('get').and.returnValue(
          Promise.resolve({
            exists: true,
            data: () => ({ vehiculo: { marca: 'Toyota', modelo: 'Corolla' } }),
          })
        ),
      }),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuentaPage],
      imports: [IonicModule.forRoot()],
      providers: [
        NavController,
        AlertController,
        LoadingController,
        { provide: LoginService, useValue: mockLoginService },
        { provide: AngularFirestore, useValue: mockFirestore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the user has a registered vehicle on ngOnInit', async () => {
    await component.ngOnInit();
    expect(mockFirestore.collection).toHaveBeenCalledWith('users');
    expect(component.tieneVehiculo).toBeTrue();
  });

  it('should set perfil to "conductor" if the user has a vehicle', () => {
    component.tieneVehiculo = true;
    component.seleccionarPerfil('conductor');
    expect(component.perfil).toBe('conductor');
  });

  it('should not allow selecting "conductor" if the user does not have a vehicle', () => {
    component.tieneVehiculo = false;
    spyOn(component, 'mostrarAlert');
    component.seleccionarPerfil('conductor');
    expect(component.mostrarAlert).toHaveBeenCalledWith(
      'No tienes un vehículo registrado, solo puedes acceder como pasajero.'
    );
    expect(component.perfil).toBe('');
  });

  it('should navigate to "registro-exitoso" if perfil is "conductor"', async () => {
    const navCtrl = TestBed.inject(NavController);
    spyOn(navCtrl, 'navigateForward');
    component.perfil = 'conductor';
    component.tieneVehiculo = true;
    await component.confirmarPerfil();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/registro-exitoso');
  });

  it('should navigate to "registro-exitoso-pasajero" if perfil is "pasajero"', async () => {
    const navCtrl = TestBed.inject(NavController);
    spyOn(navCtrl, 'navigateForward');
    component.perfil = 'pasajero';
    await component.confirmarPerfil();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/registro-exitoso-pasajero');
  });

  it('should show an alert if no perfil is selected in confirmarPerfil', async () => {
    spyOn(component, 'mostrarAlert');
    component.perfil = '';
    await component.confirmarPerfil();
    expect(component.mostrarAlert).toHaveBeenCalledWith('Por favor, selecciona un perfil.');
  });

  it('should call logout from LoginService when cerrarSesion is called', async () => {
    spyOn(component, 'mostrarAlert');
    const loadingCtrl = TestBed.inject(LoadingController);
    const loading = await loadingCtrl.create();
    spyOn(loading, 'present');
    spyOn(loading, 'dismiss').and.returnValue(Promise.resolve(true));


    await component.cerrarSesion();
    expect(mockLoginService.logout).toHaveBeenCalled();
    expect(loading.present).toHaveBeenCalled();
    expect(loading.dismiss).toHaveBeenCalled();
    expect(component.mostrarAlert).toHaveBeenCalledWith('Sesión cerrada correctamente.');
  });
});
