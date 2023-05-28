import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentDetailsDialogComponent } from './view-agent-details-dialog.component';

describe('ViewAgentDetailsDialogComponent', () => {
  let component: ViewAgentDetailsDialogComponent;
  let fixture: ComponentFixture<ViewAgentDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgentDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
