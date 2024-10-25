import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramarViajePasajeroPage } from './programar-viaje-pasajero.page';

describe('ProgramarViajePasajeroPage', () => {
  let component: ProgramarViajePasajeroPage;
  let fixture: ComponentFixture<ProgramarViajePasajeroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramarViajePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
