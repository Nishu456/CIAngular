import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchmissionsComponent } from './fetchmissions.component';

describe('FetchmissionsComponent', () => {
  let component: FetchmissionsComponent;
  let fixture: ComponentFixture<FetchmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchmissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
