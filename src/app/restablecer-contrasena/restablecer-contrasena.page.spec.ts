import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerContrasenaPage } from './restablecer-contrasena.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('RestablecerContrasenaPage', () => {
  let component: RestablecerContrasenaPage;
  let fixture: ComponentFixture<RestablecerContrasenaPage>;

  // Mock básico de AngularFirestore
  const mockAngularFirestore = {
    collection: jasmine.createSpy('collection').and.returnValue({
      doc: jasmine.createSpy('doc').and.returnValue({
        set: jasmine.createSpy('set'),
        get: jasmine.createSpy('get').and.returnValue(Promise.resolve({ exists: true, data: () => ({}) })),
      }),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestablecerContrasenaPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: AngularFirestore, useValue: mockAngularFirestore }, // Usa el mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
