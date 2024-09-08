import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoChoferPage } from './contacto-chofer.page';

describe('ContactoChoferPage', () => {
  let component: ContactoChoferPage;
  let fixture: ComponentFixture<ContactoChoferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoChoferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
