import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBeforeAfterComponent } from './modal-before-after.component';

describe('ModalBeforeAfterComponent', () => {
  let component: ModalBeforeAfterComponent;
  let fixture: ComponentFixture<ModalBeforeAfterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBeforeAfterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBeforeAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
