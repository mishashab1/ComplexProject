import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: any;

  constructor(private http: HttpClient) {
    this.headers = {};
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<any>('http://localhost:8080/api/test/refresh-token', { refreshToken });
  }

  getAccessToken(): string | null {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      return accessToken;
    }

    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
