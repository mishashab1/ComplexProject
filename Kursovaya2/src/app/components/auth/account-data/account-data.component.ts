import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartService} from "../../../services/Cart/cart.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {UserService} from "../../../services/User/user.service";

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.css']
})
export class AccountDataComponent implements OnInit {
  userData: any = {
    name: '',
    email: '',
    phone: ''
  };
  countCart: number = 0;
  oldPassword: string = '';
  newPassword: string = '';
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {}

  getUserData(): void {
    const userId: any | null = localStorage.getItem('userId');
    const accessToken: string | null = localStorage.getItem('access_token');
    console.log(userId)
    console.log(accessToken)

    if (userId && accessToken) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };
      console.log(userId)
      this.userService.getUserData(Number(userId)).subscribe(
          (response: any) => {
            this.userData = response;
          },
          (error: any) => {
            console.log(error);
          }
      );
    }
  }

  updateUserData() {
    const userId: any | null = localStorage.getItem('userId');
    const accessToken: string | null = localStorage.getItem('access_token');

    if (userId && accessToken) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };

      const updatedData = {
        firstName: this.userData.name,
        phone: this.userData.phone
      };

      // Используем сервис UserService для отправки запроса
      this.userService.updateUserData(Number(userId), updatedData).subscribe(
          (response) => {
            this.toastr.success('Данные сохранены успешно');
            console.log('Данные клиента обновлены:', response);
          },
          (error) => {
            this.toastr.error('Произошла ошибка');
            console.error('Ошибка при обновлении данных клиента:', error);
          }
      );
    } else {
      console.error('Невозможно отправить запрос - отсутствует userId или access_token');
    }
  }



  updateUserPassword() {
    if (this.oldPassword == '' || this.newPassword == '') {
      this.toastr.error('Заполните поля');
      return;
    } else if (this.oldPassword == this.newPassword) {
      this.toastr.error('Пароли совпадают');
      return;
    }

    const passwordData = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    const userId: any | null = localStorage.getItem('userId');
    const accessToken: string | null = localStorage.getItem('access_token');

    if (userId && accessToken) {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };

      this.userService.updateUserPassword(userId, passwordData).subscribe(
          (response) => {
            this.toastr.success('Пароль сохранен успешно');
            console.log('Пароль обновлен:', response);
            this.oldPassword = '';
            this.newPassword = '';
          },
          (error) => {
            this.toastr.error('Неверный пароль');
            console.error('Ошибка при обновлении пароля:', error);
          }
      );
    } else {
      console.error('Ошибка получения userId или access_token из localStorage');
    }
  }


  ngOnInit() {
    this.getUserData();
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

  logout() {
    this.router.navigate(['/not-authorized-main']); // Перенаправление на страницу для неавторизованных пользователей
  }
}


