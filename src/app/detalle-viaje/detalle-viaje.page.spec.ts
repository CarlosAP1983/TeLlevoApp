import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleViajePage } from './detalle-viaje.page';
import { NavController, ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { of } from 'rxjs';

describe('DetalleViajePage', () => {
  let component: DetalleViajePage;
  let fixture: ComponentFixture<DetalleViajePage>;
  let mockNavController: jasmine.SpyObj<NavController>;
  let mockToastController: jasmine.SpyObj<ToastController>;
  let mockActionSheetController: jasmine.SpyObj<ActionSheetController>;
  let mockAlertController: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    mockNavController = jasmine.createSpyObj('NavController', ['navigateForward']);
    mockToastController = jasmine.createSpyObj('ToastController', ['create']);
    mockActionSheetController = jasmine.createSpyObj('ActionSheetController', ['create']);
    mockAlertController = jasmine.createSpyObj('AlertController', ['create']);

    // Mock para `history.state`
    Object.defineProperty(window, 'history', {
      value: {
        state: {
          ruta: { id: 'testRutaId', origen: 'Test Origen', destino: 'Test Destino' },
          esSolicitudPasajero: false,
        },
      },
    });

    await TestBed.configureTestingModule({
      declarations: [DetalleViajePage],
      providers: [
        { provide: NavController, useValue: mockNavController },
        { provide: ToastController, useValue: mockToastController },
        { provide: ActionSheetController, useValue: mockActionSheetController },
        { provide: AlertController, useValue: mockAlertController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
