import { Component, OnInit } from '@angular/core';
import { Shoe } from "../../../models/shoe";
import { ShoesResponse } from "../cart-auth/cart-auth.component";
import { ShoeService } from "../../../services/Shoe/shoe.service";
import { HttpClient } from "@angular/common/http";
import { CartService } from "../../../services/Cart/cart.service";

@Component({
  selector: 'app-shoes-on-order',
  templateUrl: './shoes-on-order.component.html',
  styleUrls: ['./shoes-on-order.component.css']
})
export class ShoesOnOrderComponent implements OnInit {
  shoes: ShoesResponse[] = [];
  shoeTypes: { id: number, name: string }[] = [];
  selectedType: string = 'all';
  countCart: number = 0;

  constructor(
    private http: HttpClient,
    private shoeService: ShoeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.shoeService.getAllShoes().subscribe(
      (response: ShoesResponse[]) => {
        this.shoes = response;
      },
      (error: any) => {
        console.error(error);
      },
    );

    this.shoeService.getAllTypeShoes().subscribe(
      (response: { id: number, name: string }[]) => {
        this.shoeTypes = response;
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.updateCountCart();
  }

  filterShoesByType(): void {
    if (this.selectedType === 'all') {
      // If "All" is selected, show all shoes
      this.shoeService.getAllShoes().subscribe(
        (response: ShoesResponse[]) => {
          this.shoes = response;
        },
        (error: any) => {
          console.error(error);
        }
      );
    } else {
      // Filter by the selected shoe type
      this.shoeService.getShoesByType(this.selectedType).subscribe(
        (response: ShoesResponse[]) => {
          this.shoes = response;
        },
        (error: any) => {
          console.error(error);
        }
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
}
