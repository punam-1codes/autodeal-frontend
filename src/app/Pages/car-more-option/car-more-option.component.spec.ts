import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMoreOptionComponent } from './car-more-option.component';

describe('CarMoreOptionComponent', () => {
  let component: CarMoreOptionComponent;
  let fixture: ComponentFixture<CarMoreOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarMoreOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarMoreOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
