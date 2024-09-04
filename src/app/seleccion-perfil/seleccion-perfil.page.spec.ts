import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionPerfilPage } from './seleccion-perfil.page';

describe('SeleccionPerfilPage', () => {
  let component: SeleccionPerfilPage;
  let fixture: ComponentFixture<SeleccionPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
