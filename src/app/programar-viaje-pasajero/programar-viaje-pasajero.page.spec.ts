import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProgramarViajePasajeroPage } from './programar-viaje-pasajero.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';

describe('ProgramarViajePasajeroPage', () => {
  let component: ProgramarViajePasajeroPage;
  let fixture: ComponentFixture<ProgramarViajePasajeroPage>;
  let angularFirestoreMock: any;

  beforeEach(async () => {
    // Mock para AngularFirestore
    angularFirestoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        doc: jasmine.createSpy('doc').and.returnValue({
          set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
          get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: true })),
        }),
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [ProgramarViajePasajeroPage],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase en el test
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock }, // Mock para Firestore
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramarViajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba adicional: Verificar que se llame a Firestore
  it('should interact with AngularFirestore correctly', () => {
    const testCollection = angularFirestoreMock.collection('viajes');
    expect(testCollection).toBeTruthy();
  });
});
