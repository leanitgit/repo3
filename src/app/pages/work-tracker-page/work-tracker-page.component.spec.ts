import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTrackerPageComponent } from './work-tracker-page.component';

describe('WorkTrackerPageComponent', () => {
  let component: WorkTrackerPageComponent;
  let fixture: ComponentFixture<WorkTrackerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTrackerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
