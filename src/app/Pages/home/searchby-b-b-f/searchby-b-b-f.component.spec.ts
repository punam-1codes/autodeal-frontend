import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbyBBFComponent } from './searchby-b-b-f.component';

describe('SearchbyBBFComponent', () => {
  let component: SearchbyBBFComponent;
  let fixture: ComponentFixture<SearchbyBBFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbyBBFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbyBBFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
