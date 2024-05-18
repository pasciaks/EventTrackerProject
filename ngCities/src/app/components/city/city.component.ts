import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../services/city.service';
import { MapLinkPipe } from '../../pipes/map-link.pipe';
import { City } from '../../models/city';
import { CommonModule } from '@angular/common';
import { CityDetailComponent } from '../city-detail/city-detail.component';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [MapLinkPipe, CommonModule, CityDetailComponent],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
})
export class CityComponent implements OnInit {
  selected: City | null = null;

  cityId: number = 0;

  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log('Constructor');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let id = params.get('id');
        if (id === null || id === undefined) {
          return;
        }
        let intId = parseInt(id);
        if (isNaN(intId)) {
          this.router.navigateByUrl('NotFound');
          return;
        }
        this.cityId = parseInt(id);
        this.loadCity(this.cityId);
      },
    });
  }

  loadCity(id: number) {
    this.cityService.show(id).subscribe({
      next: (city: City) => {
        this.selected = city;
      },
      error: (err: Error) => {
        console.error('Observer got an error: ' + err);
        this.router.navigateByUrl('NotFound');
      },
    });
  }
}
