import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})

export class ModalInfoComponent {
  @Output() modalClosed = new EventEmitter<void>();
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalClosed.emit();
  }
}
