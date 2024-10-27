import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoPasajeroPage } from './contacto-pasajero.page';

describe('ContactoPasajeroPage', () => {
  let component: ContactoPasajeroPage;
  let fixture: ComponentFixture<ContactoPasajeroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoPasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
