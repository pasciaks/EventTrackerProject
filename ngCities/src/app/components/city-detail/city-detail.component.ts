import { Component } from '@angular/core';
import { City } from '../../models/city';
import { MapLinkPipe } from '../../pipes/map-link.pipe';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [MapLinkPipe, CommonModule],
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.css',
})
export class CityDetailComponent {
  @Input() selected: City | null = null;
}
