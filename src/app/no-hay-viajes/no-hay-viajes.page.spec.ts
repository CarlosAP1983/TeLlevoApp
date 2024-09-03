import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoHayViajesPage } from './no-hay-viajes.page';

describe('NoHayViajesPage', () => {
  let component: NoHayViajesPage;
  let fixture: ComponentFixture<NoHayViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoHayViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
