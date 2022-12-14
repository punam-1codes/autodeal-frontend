import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodealDashboardComponent } from './autodeal-dashboard.component';

describe('AutodealDashboardComponent', () => {
  let component: AutodealDashboardComponent;
  let fixture: ComponentFixture<AutodealDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodealDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodealDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
