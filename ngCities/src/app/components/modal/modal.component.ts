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
    this.childData = null;
  }

  cancel(message: string | null) {
    this.cancelEvent.emit('Cancel from child component' + message);
  }

  validateInput(city: City): boolean {
    console.log('Validate Input');
    console.log(city);

    // optimize and DRY'ify this...
    if (city.city === '') {
      console.log("City can't be empty.");
      return false;
    }
    if (city.state === '') {
      console.log("State can't be empty.");
      return false;
    }
    if (city.county === '') {
      console.log("County can't be empty.");
      return false;
    }
    if (isNaN(city.lat)) {
      console.log("Latitude can't be empty.");
      return false;
    }
    if (isNaN(city.lng)) {
      alert("Longitude can't be empty.");
      return false;
    }
    if (isNaN(city.population)) {
      console.log("Population can't be empty.");
      return false;
    }
    if (isNaN(city.density)) {
      console.log("Density can't be empty.");
      return false;
    }
    if (city.timezone === '') {
      console.log("Timezone can't be empty.");
      return false;
    }
    if (isNaN(city.ranking)) {
      console.log("Ranking can't be empty.");
      return false;
    }
    if (city.zips === '') {
      console.log("Zip codes can't be empty.");
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    console.log('Modal Component');
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' })
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
