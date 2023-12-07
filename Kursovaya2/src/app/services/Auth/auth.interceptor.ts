import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable, switchMap, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/Auth/AuthService';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isAuthenticated = this.authService.isAuthenticated();
        const accessToken = this.authService.getAccessToken();

        if (isAuthenticated && accessToken) {
          request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`
              }
            });

          return next.handle(request);
        }
        else {
          this.router.navigate(['/not-authorized-main']);
          return next.handle(request);
        }
    }

    private handleAuthError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
                localStorage.setItem('access_token', response.access_token);
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${response.access_token}`
                    }
                });
                return next.handle(request);
            }),
            catchError(() => {
                this.router.navigate(['/not-authorized-main']);
                return throwError('Authentication failed');
            })
        );
    }
}
