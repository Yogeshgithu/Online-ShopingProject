import { TestBed } from '@angular/core/testing';

import { AuthSellerGuard } from './auth-seller.guard';

describe('AuthSellerGuard', () => {
  let guard: AuthSellerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSellerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
