import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HeaderComponent } from './components/header/header.component';
import { MapLinkPipe } from './pipes/map-link.pipe';
import { FilterCitiesPipe } from './pipes/filter-cities.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CityListComponent,
    AccordionComponent,
    ModalComponent,
    PaginationComponent,
    HeaderComponent,
    MapLinkPipe,
    FilterCitiesPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ngCities';
}
