import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotivoCancelacionPage } from './motivo-cancelacion.page';

describe('MotivoCancelacionPage', () => {
  let component: MotivoCancelacionPage;
  let fixture: ComponentFixture<MotivoCancelacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoCancelacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
