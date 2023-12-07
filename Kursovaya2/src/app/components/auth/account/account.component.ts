import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CartService} from "../../../services/Cart/cart.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) {}
  countCart: number = 0;

  ngOnInit() {
    this.updateCountCart();
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['/not-authorized-main']);
    // }
    // this.updateCountCart();
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

  logout() {
    this.router.navigate(['/not-authorized-main']); // Перенаправление на страницу для неавторизованных пользователей
  }

}
