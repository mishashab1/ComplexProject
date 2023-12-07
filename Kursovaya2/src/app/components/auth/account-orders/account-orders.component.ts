// noinspection TypeScriptCheckImport
import {Component, OnInit, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {CartService} from "../../../services/Cart/cart.service";
import {OrderService} from "../../../services/Order/order.service";
import {ModalBeforeAfterComponent} from "../modal-before-after/modal-before-after.component";
import { jsPDF } from 'jspdf';
import 'src/assets/fonts/Consolas/Consolas-normal.js'
import 'src/assets/fonts/Consolas/Consolas-bold.js'
import {Router} from "@angular/router";


export interface ShoesResponse {
  price: number;
  color: string;
  material: string;
  name: string;
  photo: string;
  measurements: string;
  photoBefore: string;
  photoAfter: string;
}
export interface ServicesResponse {
  name: string;
  price: number;
  photoBefore: string;
  photoAfter: string;
}
export interface OrderResponse {
  photoBefore: string;
  photoAfter: string;
  numberOrder: number;
  createDate: string;
  endDate: string;
  express: boolean;
  statusId: number;
  shoes: ShoesResponse;
  services: ServicesResponse;

}
export interface OrderCard {
  orderNumber: number;
  dateCreate: string;
  dateEnd: string | null;
  status: number;
  express: boolean;
  totalPrice: number;
  items: (ShoesResponse | ServicesResponse)[];
}
export interface ItemWithPhotos {
  photoBefore: string;
  photoAfter: string;
}


@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.css']
})

export class AccountOrdersComponent implements OnInit {

  @ViewChild('modalBeforeAfter', { static: false })
  modalBeforeAfter!: ModalBeforeAfterComponent;
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  countCart: number = 0;
  orders: OrderResponse[] = [];
  shoes: any = [];
  services: any = [];
  orderCards: any = [];
  isVisible: boolean = false;
  selectedItem: ItemWithPhotos | null = null;


  ngOnInit() {
    this.updateCountCart();
    this.loadOrders();
  }

  openModal(item: ItemWithPhotos) {
    this.selectedItem = item;
    this.isVisible = true;
  }


  getStatusText(statusId: number): string {
    switch (statusId) {
      case 1:
        return "В процессе";
      case 2:
        return "В работе";
      case 3:
        return "Готово";
      default:
        return "Неизвестный статус";
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

  getTotalPrice() {
    if (this.orderCards) {
      this.orderCards.forEach((orderCard: OrderCard) => {
        orderCard.totalPrice = 0;
        orderCard.items.forEach((item: ShoesResponse | ServicesResponse) => {
          orderCard.totalPrice += item.price;
        });
        if (orderCard.express) {
          orderCard.totalPrice *= 1.2;
        }
      });
    }
  }

  loadOrders() {
    const userId: string | null = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found.');
      return;
    }

    this.orderService.getOrdersByUserId(userId).subscribe(
        (orders: OrderResponse[]) => {
          this.orders = orders;
          const orderCards: OrderCard[] = [];

          this.orders.forEach((order) => {
            const existingOrderCard = orderCards.find((card) => card.orderNumber === order.numberOrder);

            if (existingOrderCard) {
              if (order.shoes) {
                existingOrderCard.items.push(order.shoes);
              }
              if (order.services) {
                const servicesWithPhotos: ServicesResponse = {
                  ...order.services,
                  photoBefore: order.photoBefore,
                  photoAfter: order.photoAfter,
                };
                existingOrderCard.items.push(servicesWithPhotos);
              }
            } else {
              const dateCreate = this.datePipe.transform(order.createDate, 'dd.MM.yyyy HH:mm');
              const dateEnd = this.datePipe.transform(order.endDate, 'dd.MM.yyyy HH:mm');
              const newOrderCard: OrderCard = {
                orderNumber: order.numberOrder,
                dateCreate: dateCreate ? dateCreate : '',
                dateEnd: dateEnd ? dateEnd : '',
                status: order.statusId,
                express: order.express,
                totalPrice: 0,
                items: [],
              };

              if (order.shoes) {
                newOrderCard.items.push(order.shoes);
              }
              if (order.services) {
                const servicesWithPhotos: ServicesResponse = {
                  ...order.services,
                  photoBefore: order.photoBefore,
                  photoAfter: order.photoAfter,
                };
                newOrderCard.items.push(servicesWithPhotos);
              }
              orderCards.push(newOrderCard);
            }
          });

          this.orderCards = orderCards;
          this.getTotalPrice();
          console.log(orderCards);
        },
        (error) => {
          console.log(error);
        }
    );
  }


  generateCheck(orderCard: OrderCard) {
    const doc = new jsPDF();
    doc.addFont('Consolas-normal.ttf', 'Consolas-normal', 'normal');
    doc.setFont("Consolas-normal");

    // Добавим информацию о заказе
    const centerX = doc.internal.pageSize.getWidth() / 2;
    doc.setFontSize(16);
    doc.text(`Чек № ${orderCard.orderNumber}`, centerX, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Номер заказа: ${orderCard.orderNumber}`, 10, 40);
    doc.text(`Дата создания: ${orderCard.dateCreate}`, 10, 50);
    doc.text(`Дата завершения: ${orderCard.dateEnd}`, 10, 60);
    doc.text(`Статус: ${this.getStatusText(orderCard.status)}`, 10, 70);
    doc.text(`Срочный заказ: ${orderCard.express ? 'Да' : 'Нет'}`, 10, 80);

    let currentPos = 90;
    orderCard.items.forEach(item => {
      if ('color' in item) {
        // Если это товар
        doc.text(`${item.name} (Материал: ${item.material}, Цвет: ${item.color}, Размер: ${item.measurements}) Цена: ${item.price}`, 10, currentPos);
      } else {
        // Если это услуга
        doc.text(`${item.name}, Цена: ${item.price}`, 10, currentPos);
      }
      currentPos += 10;
    });

    // Вывод итоговой суммы прибитой к правой части
    const totalY = currentPos;
    const totalX = doc.internal.pageSize.getWidth() - 10;
    doc.setFontSize(16);
    doc.text(`Итого: ${orderCard.totalPrice}`, totalX, totalY, { align: 'right' });

    doc.save('Чек.pdf');
  }


  generateAct(orderCard: OrderCard) {
    const doc = new jsPDF();
    doc.addFont('Consolas-normal.ttf', 'Consolas-normal', 'normal');
    doc.setFont("Consolas-normal");

    const centerX = doc.internal.pageSize.getWidth() / 2;
    doc.setFontSize(16);
    doc.text(`Акт выполненных работ № ${orderCard.orderNumber}`, centerX, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Номер заказа: ${orderCard.orderNumber}`, 10, 40);
    doc.text(`Дата создания: ${orderCard.dateCreate}`, 10, 50);
    doc.text(`Дата завершения: ${orderCard.dateEnd}`, 10, 60);
    doc.text(`Срочный заказ: ${orderCard.express ? 'Да' : 'Нет'}`, 10, 70);

    let currentPos = 80;
    orderCard.items.forEach(item => {
      if ('color' in item) {
        // Если это товар
        doc.text(`${item.name} (Материал: ${item.material}, Цвет: ${item.color}, Размер: ${item.measurements}) Цена: ${item.price}`, 10, currentPos);
      } else {
        // Если это услуга
        doc.text(`${item.name}, Цена: ${item.price}`, 10, currentPos);
      }
      currentPos += 10;
    });

    const totalY = currentPos;
    const totalX = doc.internal.pageSize.getWidth() - 10;
    doc.setFontSize(16);
    doc.text(`Итого: ${orderCard.totalPrice}`, totalX, totalY, { align: 'right' });

    doc.save('Акт_выполненных_работ.pdf');
  }

  logout() {
    this.router.navigate(['/not-authorized-main']); // Перенаправление на страницу для неавторизованных пользователей
  }
}
