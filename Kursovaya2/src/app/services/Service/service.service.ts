import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ServiceResponse } from "../../models/ServiceResponse";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  private headers: any;

  constructor(private http: HttpClient) {
    this.headers = {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    };
  }

  getAllServices(): Observable<ServiceResponse[]> {
    return this.http.get<ServiceResponse[]>('http://localhost:8080/api/test/getAllServices',);
  }

  addServiceToCart(userId: any, serviceId: any, headers: { Authorization: string }): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/test/addServiceToCart', { userId, serviceId }, { headers: this.headers });
  }
}
