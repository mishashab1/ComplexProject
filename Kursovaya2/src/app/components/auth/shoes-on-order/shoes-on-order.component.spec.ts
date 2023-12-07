import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesOnOrderComponent } from './shoes-on-order.component';

describe('ShoesOnOrderComponent', () => {
  let component: ShoesOnOrderComponent;
  let fixture: ComponentFixture<ShoesOnOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoesOnOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoesOnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
