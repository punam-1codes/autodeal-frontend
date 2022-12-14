import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarComparisonComponent } from './car-comparison.component';

describe('CarComparisonComponent', () => {
  let component: CarComparisonComponent;
  let fixture: ComponentFixture<CarComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
