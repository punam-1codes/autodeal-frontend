import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBrandModelFuelModalsComponent } from './select-brand-model-fuel-modals.component';

describe('SelectBrandModelFuelModalsComponent', () => {
  let component: SelectBrandModelFuelModalsComponent;
  let fixture: ComponentFixture<SelectBrandModelFuelModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBrandModelFuelModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBrandModelFuelModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
