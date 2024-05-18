import { Component, OnInit } from '@angular/core';
import { MapLinkPipe } from '../../pipes/map-link.pipe';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city';

@Component({
  selector: 'app-state',
  standalone: true,
  imports: [MapLinkPipe, CommonModule],
  templateUrl: './state.component.html',
  styleUrl: './state.component.css',
})
export class StateComponent implements OnInit {
  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log('Constructor');
  }

  stateName: string = '';

  cities: City[] = [];

  isLoaded: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let name = params.get('name');
        if (name === null || name === undefined) {
          this.router.navigateByUrl('NotFound');
          return;
        }
        this.stateName = name;
        this.loadCitiesInState(name);
      },
    });
  }

  loadCitiesInState(name: string) {
    this.cityService.citiesInState(name).subscribe({
      next: (cities: City[]) => {
        this.cities = cities;
        this.isLoaded = true;
      },
      error: (err: Error) => {
        console.error('Observer got an error: ' + err);
        this.router.navigateByUrl('NotFound');
      },
    });
  }
}
