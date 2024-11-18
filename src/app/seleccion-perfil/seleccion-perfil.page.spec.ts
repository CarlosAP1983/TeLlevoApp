import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionPerfilPage } from './seleccion-perfil.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from 'src/environments/environment'; // Ruta correcta
import { LoginService } from '../services/login.service';

describe('SeleccionPerfilPage', () => {
  let component: SeleccionPerfilPage;
  let fixture: ComponentFixture<SeleccionPerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeleccionPerfilPage],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Usar firebaseConfig
      ],
      providers: [
        AngularFireAuth, // Proveer AngularFireAuth
        LoginService, // Proveer LoginService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ignorar componentes personalizados
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
