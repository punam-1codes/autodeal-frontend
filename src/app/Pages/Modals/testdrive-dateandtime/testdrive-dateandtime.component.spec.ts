import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdriveDateandtimeComponent } from './testdrive-dateandtime.component';

describe('TestdriveDateandtimeComponent', () => {
  let component: TestdriveDateandtimeComponent;
  let fixture: ComponentFixture<TestdriveDateandtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdriveDateandtimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdriveDateandtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
