import { TestBed } from '@angular/core/testing';

import { RoleAuthGaurdService } from './auth.service';

describe('AuthService', () => {
  let service: RoleAuthGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleAuthGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
