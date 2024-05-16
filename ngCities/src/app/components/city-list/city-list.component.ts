import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city';
@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export class CityListComponent implements OnInit {
  cities: City[] = [];

  constructor(private cityService: CityService) {
    console.log('Constructor');
  }
  ngOnInit(): void {
    this.reload();
  }

  reload() {
    // this.todos = this.todoService.index();
    this.cityService.index().subscribe({
      next: (cities: City[]) => {
        console.log(this.cities.length);
        this.cities = cities;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
    });
  }
}
