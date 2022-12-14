import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarServiceGuideComponent } from './car-service-guide.component';

describe('CarServiceGuideComponent', () => {
  let component: CarServiceGuideComponent;
  let fixture: ComponentFixture<CarServiceGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarServiceGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarServiceGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
