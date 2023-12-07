import {Component, OnInit} from '@angular/core';
import {Usluga} from "../../../models/usluga";
import {HttpClient} from "@angular/common/http";
import {CartService} from "../../../services/Cart/cart.service";
import { ServiceService } from "../../../services/Service/service.service";
import {ServiceResponse} from "../../../models/ServiceResponse";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-shoe-repair',
  templateUrl: './shoe-repair.component.html',
  styleUrls: ['./shoe-repair.component.css']
})
export class ShoeRepairComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private serviceService: ServiceService,
    private toastr: ToastrService
  ) {}
  services: ServiceResponse[] = [];
  countCart: number = 0;
  ngOnInit() {
    this.loadAllServices()
    this.updateCountCart();
  }
  loadAllServices(){
    const userId: string | null = localStorage.getItem('userId');
    const accessToken: string | null = localStorage.getItem('access_token');
    if (userId && accessToken) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };
      this.serviceService.getAllServices().subscribe(
          (response: ServiceResponse[]) => {
            this.services = response;
          },
          (error: any) => {
            console.error(error);
          },
      );
    }
  }


  updateCountCart() {
    const userId: string | null = localStorage.getItem('userId');
    const accessToken: string | null = localStorage.getItem('access_token');

    if (userId && accessToken) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };

      this.cartService.countCartItems(userId, headers).subscribe(count => {
        this.countCart = count;
      });
    }
  }

  addServiceToCart(serviceId: number): void {
    const userId: string | null = localStorage.getItem('userId');
    const accessToken: string | null = localStorage.getItem('access_token');

    if (accessToken && serviceId) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };
      this.serviceService.addServiceToCart(userId, serviceId, headers).subscribe(
          () => {
            this.updateCountCart();
            this.toastr.success('Услуга добавлена в корзину');},
          (error: any) => {
            console.error(error);
          });
    }
  }


}
