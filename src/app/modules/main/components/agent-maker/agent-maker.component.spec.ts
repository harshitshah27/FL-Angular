import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMakerComponent } from './agent-maker.component';

describe('AgentMakerComponent', () => {
  let component: AgentMakerComponent;
  let fixture: ComponentFixture<AgentMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
