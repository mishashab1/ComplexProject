import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReg } from '../../models/userReg';
import { UserLog } from "../../models/userLog";
import {UserCode} from "../../models/userCode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/test';
  private headers: any;
  constructor(private http: HttpClient) {
    const accessToken = localStorage.getItem('access_token');
    this.headers = {
      Authorization: 'Bearer ' + accessToken,
    };
  }

  registerUser(user: UserReg): Observable<any> {
    return this.http.post(this.apiUrl + '/signup', user);
  }

  signInUser(user: UserLog): Observable<any> {
    return this.http.post(this.apiUrl + '/signin', user);
  }

  checkCode(user: UserCode): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm`, user);
  }

  getUserData(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getUserDataByUserId?userId=${userId}`, { headers: this.headers });
  }
  updateUserData(userId: any, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateUserData/${userId}`, updatedData, { headers: this.headers });
  }
  updateUserPassword(userId: any, passwordData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateUserPassword/${userId}`, passwordData, { headers: this.headers });
  }

}

