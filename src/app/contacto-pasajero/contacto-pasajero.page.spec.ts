import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController, ToastController, NavController } from '@ionic/angular';
import { ContactoPasajeroPage } from './contacto-pasajero.page';

describe('ContactoPasajeroPage', () => {
  let component: ContactoPasajeroPage;
  let fixture: ComponentFixture<ContactoPasajeroPage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let toastCtrlSpy: jasmine.SpyObj<ToastController>;
  let alertCtrlSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
    alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ContactoPasajeroPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ToastController, useValue: toastCtrlSpy },
        { provide: AlertController, useValue: alertCtrlSpy },
      ],
    }).compileComponents();

    // Mock del objeto history.state para evitar errores
    Object.defineProperty(window, 'history', {
      value: {
        state: { solicitud: { id: 'test123', destino: 'Santiago', origen: 'Valparaíso' } },
      },
      writable: true,
    });

    fixture = TestBed.createComponent(ContactoPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set solicitud from history.state', () => {
    expect(component.solicitud).toEqual({ id: 'test123', destino: 'Santiago', origen: 'Valparaíso' });
  });

  it('should navigate back to gestionar-tus-rutas after showing a thank you message', async () => {
    const toastSpy = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    toastCtrlSpy.create.and.returnValue(Promise.resolve(toastSpy));

    await component.showThankYouMessage(true);

    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: 'Gracias por calificar nuestra app',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    expect(navCtrlSpy.navigateBack).toHaveBeenCalledWith('/gestionar-tus-rutas');
  });

  it('should show a warning toast if no rating is selected', async () => {
    const toastSpy = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    toastCtrlSpy.create.and.returnValue(Promise.resolve(toastSpy));

    await component.showNoSelectionMessage();

    expect(toastCtrlSpy.create).toHaveBeenCalledWith({
      message: 'No marcaste ninguna opción',
      duration: 2000,
      position: 'bottom',
      color: 'warning',
    });
    expect(toastSpy.present).toHaveBeenCalled();
  });

  it('should update rating and highlight selected stars', () => {
    component.highlightSelectedStars(3);

    expect(component.rating).toBe(3);
  });

  it('should submit a rating', async () => {
    await component.submitRating(4);

    expect(component.rating).toBe(4);
  });
});
