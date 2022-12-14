import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodealCareersComponent } from './autodeal-careers.component';

describe('AutodealCareersComponent', () => {
  let component: AutodealCareersComponent;
  let fixture: ComponentFixture<AutodealCareersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutodealCareersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodealCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
