import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroExitosoPasajeroPage } from './registro-exitoso-pasajero.page';

describe('RegistroExitosoPasajeroPage', () => {
  let component: RegistroExitosoPasajeroPage;
  let fixture: ComponentFixture<RegistroExitosoPasajeroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroExitosoPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
