import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdriveOtpverificationComponent } from './testdrive-otpverification.component';

describe('TestdriveOtpverificationComponent', () => {
  let component: TestdriveOtpverificationComponent;
  let fixture: ComponentFixture<TestdriveOtpverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdriveOtpverificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdriveOtpverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
