import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../models/city';

@Pipe({
  name: 'filterCities',
  standalone: true,
})
export class FilterCitiesPipe implements PipeTransform {
  transform(cities: City[], type: string): City[] {
    let filteredCities: City[] = [];

    type = type.toLowerCase();

    if (type === '' || type === 'all') return cities;

    if (type.length < 3) return cities;

    for (let i = 0; i < cities.length; i++) {
      if (cities[i].city.toLowerCase().indexOf(type) > -1) {
        filteredCities.push(cities[i]);
      }
    }

    return filteredCities;
  }
}
