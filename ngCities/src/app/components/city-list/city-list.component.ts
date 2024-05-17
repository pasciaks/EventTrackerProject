import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city';
import { TabsComponent } from '../tabs/tabs.component';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TabsComponent, ModalComponent],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css',
})
export class CityListComponent implements OnInit {
  cities: City[] = [];

  selected: City | null = null;

  editing: City | null = null;

  adding: City | null = null;

  constructor(private cityService: CityService) {
    console.log('Constructor');
  }
  ngOnInit(): void {
    this.reload();
  }

  childEvent(city: City | null) {
    console.log('Child Event HERE in city-list.component.ts');
    console.log(city);

    if (city === null) {
      alert('An error occurred. Please try again.');
      return;
    }

    if (city.id > 0) {
      this.update(city); // call update service method and subscribe to results
    } else {
      this.create(city); // call create service method and subscribe to results
    }
  }

  cancelEvent(message: string | null) {
    console.log('Cancel Event HERE in city-list.component.ts');
    console.log(message);
    if (message === 'Editing Cancel') {
      // special behavior for editing cancel
    }
    if (message === 'Adding Cancel') {
      // special behavior for adding cancel
    }
    this.editing = null;
    this.adding = null;
  }

  select(city: City) {
    console.log('Select');
    console.log(city);
    this.selected = city;
  }

  cancelSelect() {
    console.log('Cancel Select');
    this.selected = null;
  }

  // button click to add a new city
  add() {
    console.log('Add');
    this.adding = new City();
    console.log(this.adding);
  }

  // button click to edit a city
  edit(city: City) {
    console.log('Edit/Update');
    console.log(city);
    this.editing = Object.assign({}, city);
    console.log(this.editing);
  }

  // DELETE - button click to delete a city
  delete(city: City) {
    console.log('Delete');
    console.log(city);
    this.destroy(city);
  }

  // SAVE/UPDATE - EDIT FORM button click to save the updated city
  updateCity() {
    console.log('Update');
    console.log(this.editing);
    if (this.editing === null) {
      return;
    }
    this.update(this.editing);
    // reload the updated city as the selected one
    this.loadCity(this.editing.id);
    this.selected = Object.assign({}, this.editing);
    this.editing = null;
  }

  // SAVE/CREATE - ADD FORM button click to create a new city
  createCity() {
    console.log('Create');
    console.log(this.adding);
    if (this.adding == null) {
      return;
    }
    this.create(this.adding);
    // reload the created city as the selected one
    this.loadCity(this.adding.id);
    this.selected = Object.assign({}, this.adding);
    this.adding = null;
  }

  loadCities() {
    this.cityService.index().subscribe({
      next: (cities: City[]) => {
        console.log(this.cities.length);
        this.cities = cities;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
    });
  }

  loadCity(id: number) {
    this.cityService.show(id).subscribe({
      next: (city: City) => {
        this.selected = city;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
    });
  }

  create(city: City) {
    this.cityService.create(city).subscribe({
      next: (city: City) => {
        this.editing = null;
        this.loadCity(city.id);
        this.cancelEvent('create Success cancel');
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
    });
  }

  update(city: City) {
    this.cityService.update(city).subscribe({
      next: (city: City) => {
        this.editing = null;
        this.loadCity(city.id);
        this.cancelEvent('update Success cancel');
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
    });
  }

  destroy(city: City) {
    this.cityService.destroy(city).subscribe({
      next: () => {
        this.selected = null;
        this.adding = null;
        this.editing = null;
        this.cancelEvent('destroy Success cancel');
        this.reload();
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
    });
  }

  reload() {
    this.loadCities();
    // this.loadCity(1);
  }
}
