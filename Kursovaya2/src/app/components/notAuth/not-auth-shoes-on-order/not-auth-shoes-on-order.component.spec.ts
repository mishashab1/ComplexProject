import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthShoesOnOrderComponent } from './not-auth-shoes-on-order.component';

describe('NotAuthShoesOnOrderComponent', () => {
  let component: NotAuthShoesOnOrderComponent;
  let fixture: ComponentFixture<NotAuthShoesOnOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthShoesOnOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAuthShoesOnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
