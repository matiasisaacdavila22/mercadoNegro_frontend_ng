import { TestBed } from '@angular/core/testing';

import { ManagerAuthenticatedGuard } from './manager-authenticated.guard';

describe('ManagerAuthenticatedGuard', () => {
  let guard: ManagerAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagerAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
