import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarServiceInfoComponent } from './car-service-info.component';

describe('CarServiceInfoComponent', () => {
  let component: CarServiceInfoComponent;
  let fixture: ComponentFixture<CarServiceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarServiceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarServiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
