import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionthemeviewComponent } from './missionthemeview.component';

describe('MissionthemeviewComponent', () => {
  let component: MissionthemeviewComponent;
  let fixture: ComponentFixture<MissionthemeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionthemeviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionthemeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
