import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAuthComponent } from './cart-auth.component';

describe('CartAuthComponent', () => {
  let component: CartAuthComponent;
  let fixture: ComponentFixture<CartAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
