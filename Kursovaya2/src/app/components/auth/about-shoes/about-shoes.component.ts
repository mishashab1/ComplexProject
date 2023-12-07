import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Routes} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AboutShoe } from '../../../models/AboutShoe';
import { CartService } from "../../../services/Cart/cart.service";
import { ShoeService } from "../../../services/Shoe/shoe.service";
import {ModalInfoComponent} from "../modal-info/modal-info.component";
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-about-shoes',
  templateUrl: './about-shoes.component.html',
  styleUrls: ['./about-shoes.component.css']
})
export class AboutShoesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService,
    private shoeService: ShoeService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  shoe: AboutShoe | undefined;
  countCart: number = 0;
  measurements: any;
  ngOnInit() {
    this.loadShoes()
    this.updateCountCart();
  }

  loadShoes() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.shoeService.getShoeById(productId).subscribe((response: AboutShoe) => {
        this.shoe = response;
      });
    });
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

  addToCart() {
    const userId: string | null = localStorage.getItem('userId');
    const request = {
      serviceId: null,
      shoesId: this.shoe?.id,
      userId: userId,
      measurements: this.measurements,
      orderCreate: false
    };
    this.shoeService.addShoesToCart(request.userId, request.shoesId!, request.measurements).subscribe(() => {
      this.toastr.success('Товар добавлен в корзину');
      console.log('Обувь успешно добавлена в корзину');
      this.updateCountCart();
    }, (error: any) => {
      console.error('Ошибка при добавлении обуви в корзину:', error);
    });
  }

  @ViewChild(ModalInfoComponent) modalInfo!: ModalInfoComponent;
  openModal() {
    this.modalInfo.openModal();
  }
  onModalClosed() {
    this.modalInfo.closeModal();
  }
}
