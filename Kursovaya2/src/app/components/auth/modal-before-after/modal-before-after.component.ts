import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountOrdersComponent} from "../account-orders/account-orders.component";

@Component({
  selector: 'app-modal-before-after',
  templateUrl: './modal-before-after.component.html',
  styleUrls: ['./modal-before-after.component.css'],
})
export class ModalBeforeAfterComponent implements OnInit {
  @Input() photoBefore: string | undefined = '';
  @Input() photoAfter: string | undefined = '';
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();
  public isVisible: boolean = true;

  ngOnInit() {
    console.log('photoBefore:', this.photoBefore);
    console.log('photoAfter:', this.photoAfter);
  }
  closeModal() {
    this.closed.emit();
  }
}
