import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagarProductos } from './pagar-productos';

describe('PagarProductos', () => {
  let component: PagarProductos;
  let fixture: ComponentFixture<PagarProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarProductos],
    }).compileComponents();

    fixture = TestBed.createComponent(PagarProductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
