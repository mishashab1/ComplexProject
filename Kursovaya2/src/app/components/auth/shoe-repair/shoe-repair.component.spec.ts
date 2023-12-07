import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeRepairComponent } from './shoe-repair.component';

describe('ShoeRepairComponent', () => {
  let component: ShoeRepairComponent;
  let fixture: ComponentFixture<ShoeRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoeRepairComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoeRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
