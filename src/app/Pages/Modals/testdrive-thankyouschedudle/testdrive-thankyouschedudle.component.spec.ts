import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdriveThankyouschedudleComponent } from './testdrive-thankyouschedudle.component';

describe('TestdriveThankyouschedudleComponent', () => {
  let component: TestdriveThankyouschedudleComponent;
  let fixture: ComponentFixture<TestdriveThankyouschedudleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdriveThankyouschedudleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdriveThankyouschedudleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
