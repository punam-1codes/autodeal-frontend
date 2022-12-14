import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestcarfooterComponent } from './latestcarfooter.component';

describe('LatestcarfooterComponent', () => {
  let component: LatestcarfooterComponent;
  let fixture: ComponentFixture<LatestcarfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestcarfooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestcarfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
