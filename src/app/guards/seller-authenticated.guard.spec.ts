import { TestBed } from '@angular/core/testing';

import { SellerAuthenticatedGuard } from './seller-authenticated.guard';

describe('SellerAuthenticatedGuard', () => {
  let guard: SellerAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
