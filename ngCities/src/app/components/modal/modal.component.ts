import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Input, Output } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { City } from '../../models/city';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgbDatepickerModule, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  private modalService = inject(NgbModal);
  @Input() childData: City | null = null;
  @Output() childEvent = new EventEmitter<City | null>();
  @Output() cancelEvent = new EventEmitter<string | null>();
  closeResult = '';

  sendData() {
    const dataToSend = 'Data from child component';
    this.childEvent.emit(this.childData);
  }

  cancel(message: string | null) {
    this.cancelEvent.emit('Cancel from child component' + message);
  }

  ngOnInit(): void {
    console.log('Modal Component');
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.cancelEvent.emit('Cancel from child component' + reason);
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
