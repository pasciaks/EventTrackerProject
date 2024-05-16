import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CityListComponent,
    AccordionComponent,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ngCities';
}
