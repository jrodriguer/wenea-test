import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
