import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclusionScreenComponent } from './conclusion-screen.component';

describe('ConclusionScreenComponent', () => {
  let component: ConclusionScreenComponent;
  let fixture: ComponentFixture<ConclusionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConclusionScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclusionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
