import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteertimeComponent } from './volunteertime.component';

describe('VolunteertimeComponent', () => {
  let component: VolunteertimeComponent;
  let fixture: ComponentFixture<VolunteertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteertimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
