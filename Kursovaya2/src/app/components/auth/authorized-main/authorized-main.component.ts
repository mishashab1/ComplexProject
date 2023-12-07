import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartService} from "../../../services/Cart/cart.service";

@Component({
  selector: 'app-authorized-main',
  templateUrl: './authorized-main.component.html',
  styleUrls: ['./authorized-main.component.css']
})
export class AuthorizedMainComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}
  countCart: number = 0;
  ngOnInit() {
    this.updateCountCart();
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


}
