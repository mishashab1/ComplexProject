import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ShoesResponse } from "../../components/auth/cart-auth/cart-auth.component";
import {AboutShoe} from "../../models/AboutShoe";

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  private headers: any;

  constructor(private http: HttpClient) {
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    };
  }

  getAllShoes(): Observable<ShoesResponse[]> {
    return this.http.get<ShoesResponse[]>(
        'http://localhost:8080/api/test/getAllShoes'
    );
  }

  getShoesByType(typeId: any): Observable<ShoesResponse[]> {
    const url = `http://localhost:8080/api/test/getShoesByTypeTypeId?typeShoesId=${typeId}`;
    return this.http.get<ShoesResponse[]>(url, { headers: this.headers });
  }

  getAllTypeShoes(): Observable<ShoesResponse[]> {
    return this.http.get<ShoesResponse[]>(
        'http://localhost:8080/api/test/getAllTypeShoes',
        { headers: this.headers }
    );
  }

  addShoesToCart(userId: any, shoesId: any, measurements: string): Observable<void> {
    const request = { serviceId: null, shoesId, userId, measurements, orderCreate: false };
    return this.http.post<void>('http://localhost:8080/api/test/addShoesToCart', request, { headers: this.headers });
  }
  getShoeById(shoeId: number): Observable<AboutShoe> {
    const url = `http://localhost:8080/api/test/findShoeById?id=${shoeId}`;
    return this.http.get<AboutShoe>(url, { headers: this.headers });
  }
}


