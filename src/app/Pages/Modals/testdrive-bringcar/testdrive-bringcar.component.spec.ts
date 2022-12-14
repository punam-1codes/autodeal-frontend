import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdriveBringcarComponent } from './testdrive-bringcar.component';

describe('TestdriveBringcarComponent', () => {
  let component: TestdriveBringcarComponent;
  let fixture: ComponentFixture<TestdriveBringcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdriveBringcarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdriveBringcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
