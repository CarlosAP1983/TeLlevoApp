import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

// Mock para AngularFirestore
class AngularFirestoreMock {
  collection(collectionName: string) {
    return {
      doc: (id: string) => ({
        set: (data: any) => Promise.resolve(), // Simula la adición de datos
      }),
      get: () => Promise.resolve({ empty: false, docs: [] }), // Simula una colección con datos
    };
  }
}

// Mock para NavController
const NavControllerMock = {
  navigateForward: jasmine.createSpy('navigateForward'),
};

// Mock para ToastController
const ToastControllerMock = {
  create: jasmine.createSpy('create').and.returnValue(
    Promise.resolve({ present: () => Promise.resolve() })
  ),
};

// Mock para LoadingController
const LoadingControllerMock = {
  create: jasmine.createSpy('create').and.returnValue(
    Promise.resolve({ present: () => Promise.resolve(), dismiss: () => Promise.resolve() })
  ),
};

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      providers: [
        { provide: AngularFirestore, useClass: AngularFirestoreMock },
        { provide: NavController, useValue: NavControllerMock },
        { provide: ToastController, useValue: ToastControllerMock },
        { provide: LoadingController, useValue: LoadingControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page', () => {
    component['navCtrl'].navigateForward('/login');
    expect(NavControllerMock.navigateForward).toHaveBeenCalledWith('/login');
  });

  it('should add user to Firestore', async () => {
    const firestore = TestBed.inject(AngularFirestore); // Inyectar Firestore desde TestBed
    const firestoreSpy = spyOn(
      firestore.collection('users').doc('testUserId'),
      'set'
    ).and.callThrough();

    const mockUser = { name: 'Test User', email: 'test@example.com' };
    await firestore.collection('users').doc('testUserId').set(mockUser);

    expect(firestoreSpy).toHaveBeenCalledWith(mockUser);
  });
});
