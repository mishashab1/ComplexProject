import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutShoesComponent } from './about-shoes.component';

describe('AboutShoesComponent', () => {
  let component: AboutShoesComponent;
  let fixture: ComponentFixture<AboutShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutShoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
