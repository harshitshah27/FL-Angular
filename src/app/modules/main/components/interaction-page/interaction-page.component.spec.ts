import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionPageComponent } from './interaction-page.component';

describe('InteractionPageComponent', () => {
  let component: InteractionPageComponent;
  let fixture: ComponentFixture<InteractionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
