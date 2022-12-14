import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarVideoComponent } from './car-video.component';

describe('CarVideoComponent', () => {
  let component: CarVideoComponent;
  let fixture: ComponentFixture<CarVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
