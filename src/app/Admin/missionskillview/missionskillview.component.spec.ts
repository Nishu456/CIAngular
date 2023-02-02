import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionskillviewComponent } from './missionskillview.component';

describe('MissionskillviewComponent', () => {
  let component: MissionskillviewComponent;
  let fixture: ComponentFixture<MissionskillviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionskillviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionskillviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
