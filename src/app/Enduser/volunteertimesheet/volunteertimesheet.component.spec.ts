import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteertimesheetComponent } from './volunteertimesheet.component';

describe('VolunteertimesheetComponent', () => {
  let component: VolunteertimesheetComponent;
  let fixture: ComponentFixture<VolunteertimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteertimesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteertimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
