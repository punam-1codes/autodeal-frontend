import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryUpdatesComponent } from './industry-updates.component';

describe('IndustryUpdatesComponent', () => {
  let component: IndustryUpdatesComponent;
  let fixture: ComponentFixture<IndustryUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
