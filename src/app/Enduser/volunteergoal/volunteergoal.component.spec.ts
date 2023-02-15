import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteergoalComponent } from './volunteergoal.component';

describe('VolunteergoalComponent', () => {
  let component: VolunteergoalComponent;
  let fixture: ComponentFixture<VolunteergoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteergoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteergoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
