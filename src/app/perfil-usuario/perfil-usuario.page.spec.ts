import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuarioPage } from './perfil-usuario.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment'; // Importa el environment adecuado
import { NavController } from '@ionic/angular';

describe('PerfilUsuarioPage', () => {
  let component: PerfilUsuarioPage;
  let fixture: ComponentFixture<PerfilUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilUsuarioPage],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)], // Proveer configuración de Firebase
      providers: [
        AngularFireStorage, // Proveer AngularFireStorage
        StorageService,
        { provide: NavController, useValue: jasmine.createSpyObj('NavController', ['navigateForward']) },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignorar errores por componentes personalizados
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
