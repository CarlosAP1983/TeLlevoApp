import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionarTusRutasPage } from './gestionar-tus-rutas.page';

describe('GestionarTusRutasPage', () => {
  let component: GestionarTusRutasPage;
  let fixture: ComponentFixture<GestionarTusRutasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTusRutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
