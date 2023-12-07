import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CartResponse } from "../../components/auth/cart-auth/cart-auth.component";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private headers: any;
  constructor(private http: HttpClient) {
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    };
  }
  getCartByUserId(userId: any, headers: any): Observable<CartResponse[]> {
    return this.http.get<CartResponse[]>(`http://localhost:8080/api/test/getCartByUserId?userId=${userId}`, { headers: this.headers });
  }
  getTotalPriceByUserId(userId: any, headers: any): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/test/getTotalPriceByUserId?userId=${userId}`, { headers: this.headers });
  }
  removeFromCart(itemId: any, headers: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/test/removeFromCart?itemId=${itemId}`, null, { headers: this.headers });
  }
  countCartItems(userId: any, headers: any): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/test/countCartItems?userId=${userId}`, { headers: this.headers });
  }
}

