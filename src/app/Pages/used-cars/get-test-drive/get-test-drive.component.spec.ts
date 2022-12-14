import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTestDriveComponent } from './get-test-drive.component';

describe('GetTestDriveComponent', () => {
  let component: GetTestDriveComponent;
  let fixture: ComponentFixture<GetTestDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTestDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTestDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
