import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdriveLocationComponent } from './testdrive-location.component';

describe('TestdriveLocationComponent', () => {
  let component: TestdriveLocationComponent;
  let fixture: ComponentFixture<TestdriveLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdriveLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdriveLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
