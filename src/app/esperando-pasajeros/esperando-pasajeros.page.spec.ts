import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsperandoPasajerosPage } from './esperando-pasajeros.page';

describe('EsperandoPasajerosPage', () => {
  let component: EsperandoPasajerosPage;
  let fixture: ComponentFixture<EsperandoPasajerosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EsperandoPasajerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
