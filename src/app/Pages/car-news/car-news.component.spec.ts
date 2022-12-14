import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNewsComponent } from './car-news.component';

describe('CarNewsComponent', () => {
  let component: CarNewsComponent;
  let fixture: ComponentFixture<CarNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
