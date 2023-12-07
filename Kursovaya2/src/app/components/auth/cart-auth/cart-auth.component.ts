import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/Cart/cart.service";
import {OrderService} from "../../../services/Order/order.service";
import {ToastrService} from "ngx-toastr";

export interface ShoesResponse {
  id: number,
  price: number,
  color: string,
  material: string,
  typeShoesId: number,
  name: string,
  photo: string,
  measurements: string
}

export interface ServicesResponse {
  id: number,
  name: string,
  price: number
}

export interface CartResponse {
  id: number,
  shoes: ShoesResponse,
  services: ServicesResponse
}

@Component({
  selector: 'app-cart-auth',
  templateUrl: './cart-auth.component.html'
})
export class CartAuthComponent implements OnInit{
  constructor(
    private cartService: CartService,
    private orderService:OrderService,
    private toastr: ToastrService
  ) {}

  carts: CartResponse[] = [];
  shoes: any = [];
  services: any = [];
  totalPrice: number = 0;
  isExpressOrder: boolean = false;
  countCart: number = 0;


  ngOnInit() {
    this.loadCarts()
    this.updateCountCart();
  }

  loadCarts(){
    const userId: string | null = localStorage.getItem('userId');
    const accessToken: string | null = localStorage.getItem('access_token');
    if (userId && accessToken) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };

      this.cartService.getCartByUserId(userId, headers).subscribe((carts: CartResponse[]) => {
            this.carts = carts;
            this.carts.forEach(cart => {
              if (cart.shoes !== null) {
                const shoe = {
                  id: cart.shoes.id,
                  cartId: cart.id,
                  price: cart.shoes.price,
                  color: cart.shoes.color,
                  material: cart.shoes.material,
                  typeShoesId: cart.shoes.typeShoesId,
                  name: cart.shoes.name,
                  photo: cart.shoes.photo,
                  measurements: cart.shoes.measurements
                };
                this.shoes.push(shoe);
              }
              if (cart.services !== null) {
                const service = {
                  id: cart.services.id,
                  cartId: cart.id,
                  name: cart.services.name,
                  price: cart.services.price
                };
                this.services.push(service);
              }
            });
          },
          error => {
            console.log(error)
          })

      this.cartService.getTotalPriceByUserId(userId, headers).subscribe((price: number) => {
            this.totalPrice=price;
          },
          error => {
            console.log(error);
          })
    }
  }

  updatePriceExpress() {
    if (this.isExpressOrder) {
      this.totalPrice = Math.round(this.totalPrice * 1.2);
    } else {
      this.totalPrice = Math.round(this.totalPrice / 1.2);
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

  updateTotalPriceFromCart() {
    let totalPrice = 0;

    for (const shoe of this.shoes) {
      totalPrice += shoe.price;
    }
    for (const service of this.services) {
      totalPrice += service.price;
    }
    this.totalPrice = totalPrice;
  }

  removeFromShoes(shoe: any) {
    this.removeFromCart(shoe.cartId);

    const index = this.shoes.indexOf(shoe);
    if (index !== -1) {
      this.shoes.splice(index, 1);
    }
  }

  removeFromServices(service: any) {
    this.removeFromCart(service.cartId);

    const index = this.services.indexOf(service);
    if (index !== -1) {
      this.services.splice(index, 1);
    }
    this.updateTotalPriceFromCart();
  }

  private removeFromCart(cartId: number) {
    const accessToken: string | null = localStorage.getItem('access_token');

    if (cartId && accessToken) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };

      this.cartService.removeFromCart(cartId, headers).subscribe(() => {
        this.updateTotalPriceFromCart();
        this.updateCountCart();
      }, error => {
        console.log(error);
      });
    }
  }

  createOrder() {
    // Проверка
    if (this.carts.length === 0) {
      this.toastr.error('Корзина пуста');
      return;
    }

    const userId: string | null = localStorage.getItem('userId');

    this.orderService.saveOrder(userId, this.isExpressOrder).subscribe(
        () => {
          console.log("Заказ оформлен успешно");
          setTimeout(() => {
            location.reload();
          }, 3000);
          this.toastr.success('Заказ оформлен успешно');
          this.toastr.info('Детали заказа можно посмотреть в истории заказов');
        },
        error => {
          console.log("Ошибка при создании заказа: ", error);
          this.toastr.error('Ошибка при создании заказа');
        }
    );
  }


}

