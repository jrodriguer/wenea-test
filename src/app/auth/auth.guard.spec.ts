import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

// When AuthGuard guards a CanActivate hook, access to the route is rejected
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let serviceStub: Partial<AuthService>;

  beforeEach(() => {
    serviceStub = {};
    guard = new AuthGuard(serviceStub as AuthService, routerSpy);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
