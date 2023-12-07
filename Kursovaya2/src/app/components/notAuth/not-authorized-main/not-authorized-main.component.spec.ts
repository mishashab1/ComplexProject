import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizedMainComponent } from './not-authorized-main.component';

describe('NotAuthorizedMainComponent', () => {
  let component: NotAuthorizedMainComponent;
  let fixture: ComponentFixture<NotAuthorizedMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthorizedMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAuthorizedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
