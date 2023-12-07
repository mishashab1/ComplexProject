import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedMainComponent } from './authorized-main.component';

describe('AuthorizedMainComponent', () => {
  let component: AuthorizedMainComponent;
  let fixture: ComponentFixture<AuthorizedMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizedMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
