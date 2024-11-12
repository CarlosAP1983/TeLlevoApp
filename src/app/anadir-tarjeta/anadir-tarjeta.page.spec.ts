import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirTarjetaPage } from './anadir-tarjeta.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

describe('AnadirTarjetaPage', () => {
  let component: AnadirTarjetaPage;
  let fixture: ComponentFixture<AnadirTarjetaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnadirTarjetaPage],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AnadirTarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Pruebas para validar el numero de tarjeta
  describe('Formato del número de tarjeta', () => {
    it('Debería eliminar letras y dejar solo números en bloques de 4', () => {
      const eventoMock = { target: { value: '1234abcd5678' } };
      component.formatearNumeroTarjeta(eventoMock);
      expect(eventoMock.target.value).toBe('1234 5678');
    });

    it('Debería limitar la entrada a 16 dígitos', () => {
      const eventoMock = { target: { value: '12345678901234567890' } };
      component.formatearNumeroTarjeta(eventoMock);
      expect(eventoMock.target.value).toBe('1234 5678 9012 3456');
    });

    it('Debería manejar entradas cortas sin agregar espacios extras', () => {
      const eventoMock = { target: { value: '1234' } };
      component.formatearNumeroTarjeta(eventoMock);
      expect(eventoMock.target.value).toBe('1234');
    });
  });

  //Pruebas para validar la fecha de vencimiento
  describe('Formato de fecha de caducidad', () => {
    it('Debería eliminar letras y dar formato MM/AA', () => {
      const eventoMock = { target: { value: '1240abcd' } };
      component.formatearCaducidad(eventoMock);
      expect(eventoMock.target.value).toBe('12/40');
    });

    it('Debería limitar la entrada a 4 dígitos para MM/AA', () => {
      const eventoMock = { target: { value: '122022' } };
      component.formatearCaducidad(eventoMock);
      expect(eventoMock.target.value).toBe('12/20');
    });

    it('Debería manejar una entrada corta sin añadir el separador /', () => {
      const eventoMock = { target: { value: '1' } };
      component.formatearCaducidad(eventoMock);
      expect(eventoMock.target.value).toBe('1');
    });
  });
});
