import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteermissionComponent } from './volunteermission.component';

describe('VolunteermissionComponent', () => {
  let component: VolunteermissionComponent;
  let fixture: ComponentFixture<VolunteermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
