import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroExitosoPasajeroPage } from './registro-exitoso-pasajero.page';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

// Mock para AngularFirestore
class AngularFirestoreMock {
  collection(collectionName: string) {
    if (collectionName === 'viajes') {
      return {
        get: () => Promise.resolve({ empty: false, docs: [] }), // Simula colección 'viajes' vacía
      };
    }
    if (collectionName === 'solicitudesPasajeros') {
      return {
        get: () => Promise.resolve({ empty: false, docs: [] }), // Simula colección 'solicitudesPasajeros' vacía
      };
    }
    return {
      get: () => Promise.resolve({ empty: true }), // Caso por defecto: colección vacía
    };
  }
}

describe('RegistroExitosoPasajeroPage', () => {
  let component: RegistroExitosoPasajeroPage;
  let fixture: ComponentFixture<RegistroExitosoPasajeroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroExitosoPasajeroPage],
      providers: [
        { provide: AngularFirestore, useClass: AngularFirestoreMock },
        NavController,
        ActionSheetController,
        AlertController,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroExitosoPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch available routes', async () => {
    spyOn(component, 'obtenerRutasDisponibles').and.callThrough();
    await component.obtenerRutasDisponibles();
    expect(component.rutasDisponibles.length).toBe(0); 
  });

  it('should fetch user-created trips', async () => {
    spyOn(component, 'obtenerMisViajesCreados').and.callThrough();
    await component.obtenerMisViajesCreados();
    expect(component.misViajesCreados.length).toBe(0); 
  });
});
