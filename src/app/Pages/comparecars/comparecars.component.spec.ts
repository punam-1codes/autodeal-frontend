import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparecarsComponent } from './comparecars.component';

describe('ComparecarsComponent', () => {
  let component: ComparecarsComponent;
  let fixture: ComponentFixture<ComparecarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparecarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparecarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
