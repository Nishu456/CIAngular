import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionviewComponent } from './missionview.component';

describe('MissionviewComponent', () => {
  let component: MissionviewComponent;
  let fixture: ComponentFixture<MissionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
