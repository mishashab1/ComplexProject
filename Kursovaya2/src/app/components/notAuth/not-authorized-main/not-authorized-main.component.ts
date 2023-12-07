import {Component, ViewChild} from '@angular/core';
import {LoginModalComponent} from "../login-modal/login-modal.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-authorized-main',
  templateUrl: './not-authorized-main.component.html',
  styleUrls: ['./not-authorized-main.component.css']
})
export class NotAuthorizedMainComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  @ViewChild(LoginModalComponent) loginModal!: LoginModalComponent;
  openModal() {
    this.loginModal.openModal();
  }

  onModalClosed() {
    this.loginModal.closeModal();
  }
}
