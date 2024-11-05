import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirTarjetaPage } from './anadir-tarjeta.page';

describe('AnadirTarjetaPage', () => {
  let component: AnadirTarjetaPage;
  let fixture: ComponentFixture<AnadirTarjetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirTarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
