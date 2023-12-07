import {Component, EventEmitter, Output} from '@angular/core';
import { UserReg } from 'src/app/models/userReg';
import { UserService } from 'src/app/services/User/user.service';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserLog} from "../../../models/userLog";
import {UserCode} from "../../../models/userCode";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {}

  // ------------Навигация------------
  selectedTab = 'login'; // Выбранная вкладка по умолчанию
  public isVisible: boolean = false;
  public twoFactorAuthStep: boolean = false;
  showLoginForm = true;
  showRegistrationForm = false;
  @Output() modalClosed = new EventEmitter<void>();
  isModalOpen = false;
  showRegistration() {
    this.selectedTab = 'register'; // Изменение выбранной вкладки на 'register'
    this.showLoginForm = false;
    this.showRegistrationForm = true;
  }
  showLogin() {
    this.selectedTab = 'login'; // Изменение выбранной вкладки на 'login'
    this.showLoginForm = true;
    this.showRegistrationForm = false;
  }
  openModal() {
    this.isModalOpen = true;
    this.isVisible = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.isVisible = false;
  }
  // ^^------------Навигация------------^^

  public loginEmail: string = '';
  public loginPassword: string = '';
  public loginCode: string = '';
  public regFName: string = '';
  public regPhone: string = '';
  public regEmail: string = '';
  public regPassword: string = '';
  public regPasswordRepeat: string = '';
  isLoading: boolean = false;

  checkRegistration() {
    if (this.selectedTab === 'register' && (!this.regFName || !this.regEmail || !this.regPassword || !this.regPasswordRepeat)) {
      this.toastr.error('Обязательные поля регистрации должны быть заполнены');
      return;
    } else if (this.regPassword !== this.regPasswordRepeat) {
      this.toastr.error('Пароли не совпадают');
      return;
    }

    const user: UserReg = {
      email: this.regEmail,
      password: this.regPassword,
      firstName: this.regFName,
      phone: this.regPhone
    };

    this.userService.registerUser(user).subscribe(
      response => {
        console.log('Регистрация успешна');
        this.toastr.success('Регистрация прошла успешно');
      },
      error => {
        console.error('Ошибка при регистрации', error);
        this.toastr.error('Произошла ошибка');
      }
    );
  }

  checkEmailPass() {
    this.isLoading = true;
    if (this.selectedTab === 'login' && (!this.loginEmail || !this.loginPassword)) {
      this.toastr.error('Обязательные поля входа должны быть заполнены');
      return;
    }

    const user: UserLog = {
      email: this.loginEmail,
      password: this.loginPassword
    };

    this.userService.signInUser(user).subscribe(
      response => {
        this.twoFactorAuthStep = true;
        this.showRegistrationForm = false;
        this.showLoginForm = false;
        this.isLoading = false;

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        console.log(response.access_token)
        console.log(response.access_token)
      },
      error => {
        console.error('Ошибка при входе', error);
        this.toastr.error('Произошла ошибка');
        this.isLoading = false;
      }
    );
  }

  checkAuthCode() {
    const user: UserCode = {
      email: this.loginEmail,
      code: this.loginCode,
    };


    this.userService.checkCode(user).subscribe(
      (response: any) => {
        if (!isNaN(response)) {
          localStorage.setItem('userId', response.toString());
          this.toastr.success('Код подтверждён');
          console.log("Перенаправление на authorized-main")
          this.router.navigate(['/authorized-main']);
        } else {
          this.toastr.error('Произошла ошибка');
        }
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/not-authorized-main']);
        } else {
          this.toastr.error('Произошла ошибка');
        }
      }
    );
  }

}
