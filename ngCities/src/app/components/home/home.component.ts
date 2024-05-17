import { Component } from '@angular/core';
import { CityListComponent } from '../city-list/city-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CityListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
