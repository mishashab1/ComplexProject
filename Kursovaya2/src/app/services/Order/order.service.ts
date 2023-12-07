import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderResponse} from "../../components/auth/account-orders/account-orders.component";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private headers: any;
  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
  }
  private getHeaders(): any {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    };
  }

  saveOrder(userId: any, isExpressOrder: boolean): Observable<any> {
    const request = { userId: userId, express: isExpressOrder };
    return this.http.post<any>(`http://localhost:8080/api/test/saveOrder`, request, { headers: this.headers });
  }

  getOrdersByUserId(userId: any): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`http://localhost:8080/api/test/getOrdersByUserId?userId=${userId}`, { headers: this.headers });
  }
}

