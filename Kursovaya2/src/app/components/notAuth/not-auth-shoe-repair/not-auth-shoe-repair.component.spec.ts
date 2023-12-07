import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthShoeRepairComponent } from './not-auth-shoe-repair.component';

describe('NotAuthShoeRepairComponent', () => {
  let component: NotAuthShoeRepairComponent;
  let fixture: ComponentFixture<NotAuthShoeRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthShoeRepairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAuthShoeRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
