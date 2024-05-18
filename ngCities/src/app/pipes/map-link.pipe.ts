import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../models/city';

@Pipe({
  name: 'mapLink',
  standalone: true,
})
export class MapLinkPipe implements PipeTransform {
  transform(city: City, zoom: string): string {
    let url: string = `https://www.google.com/maps/@${city.lat},${city.lng},${zoom}z?entry=ttu`;

    return url;
  }
}
