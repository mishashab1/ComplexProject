import {Component, OnInit} from '@angular/core';
import {ShoesResponse} from "../../auth/cart-auth/cart-auth.component";
import {ShoeService} from "../../../services/Shoe/shoe.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-auth-shoes-on-order',
  templateUrl: './not-auth-shoes-on-order.component.html',
  styleUrls: ['./not-auth-shoes-on-order.component.css']
})
export class NotAuthShoesOnOrderComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private shoeService : ShoeService
  ) {}

  shoes: ShoesResponse[] = [];
  ngOnInit(): void {
    this.shoeService.getAllShoes().subscribe(
      (response: ShoesResponse[]) => {
        this.shoes = response;
      },
      (error: any) => {
        console.error(error);
      },
    );
  }

}
