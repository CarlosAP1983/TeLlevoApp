import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoCancelacionPage } from './motivo-cancelacion.page';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock de AngularFirestore
class AngularFirestoreMock {
  collection(collectionName: string) {
    return {
      doc: (id: string) => ({
        delete: () => Promise.resolve(), // Simula la eliminación exitosa del documento
      }),
    };
  }
}

// Mock de ActivatedRoute
const ActivatedRouteMock = {
  snapshot: {
    paramMap: {
      get: (key: string) => 'testRutaId', // Simula un parámetro de ruta
    },
  },
};

describe('MotivoCancelacionPage', () => {
  let component: MotivoCancelacionPage;
  let fixture: ComponentFixture<MotivoCancelacionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotivoCancelacionPage],
      providers: [
        { provide: AngularFirestore, useClass: AngularFirestoreMock }, // Mock Firestore
        { provide: ActivatedRoute, useValue: ActivatedRouteMock }, // Mock ActivatedRoute
        NavController,
        ToastController,
        LoadingController,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MotivoCancelacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rutaId from state', () => {
    component.ionViewWillEnter();
    expect(component.rutaId).toBe('testRutaId');
  });

  it('should delete route successfully', async () => {
    spyOn(component['firestore'].collection('viajes').doc('testRutaId'), 'delete').and.callThrough();

    component.selectedMotivo = 'Cambio de planes';
    component.rutaId = 'testRutaId';
    await component.confirmarCancelacion();

    expect(component['firestore'].collection('viajes').doc('testRutaId').delete).toHaveBeenCalled();
  });

  it('should show warning if motivo not selected', async () => {
    spyOn(component['toastCtrl'], 'create').and.callThrough();

    component.selectedMotivo = '';
    await component.confirmarCancelacion();

    expect(component['toastCtrl'].create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: 'Por favor, selecciona un motivo de cancelación.',
      })
    );
  });
});
