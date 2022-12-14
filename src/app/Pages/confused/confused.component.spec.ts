import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfusedComponent } from './confused.component';

describe('ConfusedComponent', () => {
  let component: ConfusedComponent;
  let fixture: ComponentFixture<ConfusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfusedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
