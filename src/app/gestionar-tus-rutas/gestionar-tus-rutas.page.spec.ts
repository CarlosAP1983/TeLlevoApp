import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { GestionarTusRutasPage } from './gestionar-tus-rutas.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('GestionarTusRutasPage', () => {
  let component: GestionarTusRutasPage;
  let fixture: ComponentFixture<GestionarTusRutasPage>;

  // Mock básico para AngularFirestore
  const mockAngularFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({
      doc: jasmine.createSpy('doc').and.returnValue({
        valueChanges: jasmine.createSpy('valueChanges').and.returnValue({
          subscribe: jasmine.createSpy('subscribe'),
        }),
        set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
        get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: true, data: () => ({}) })),
      }),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionarTusRutasPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AngularFirestore, useValue: mockAngularFirestore }, // Provee el mock de AngularFirestore
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionarTusRutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
