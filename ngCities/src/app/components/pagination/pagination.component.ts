import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from '../../models/content';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapLinkPipe } from '../../pipes/map-link.pipe';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgbPaginationModule, CommonModule, FormsModule, MapLinkPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  // @Output() pageChanged = new EventEmitter<number | null>();

  ngOnInit(): void {
    console.log('PaginationComponent');
    this.loadPages(this.pageSize, this.page);
  }
  page = 0;

  pageSize = 10;

  isLoaded: boolean = false;

  selectedPage: number = 0;

  selectedPageSize: number = 10;

  totalElements: number = 0;

  cities: City[] = [];

  selectChanged() {
    console.log('selectChanged');
    this.isLoaded = false;
    this.loadPages(this.selectedPageSize, this.selectedPage);
  }

  updatePage($event: any) {
    console.log('updatePage');
    console.log($event);
    this.page = $event;
    console.log('Page: ' + this.page);
    this.isLoaded = false;
    this.loadPages(this.selectedPageSize, this.selectedPage);
  }

  firstPage() {
    console.log('firstPage');
    this.selectedPage = 0;
    console.log('Page: ' + this.selectedPage);
    this.isLoaded = false;
    this.loadPages(this.selectedPageSize, this.selectedPage);
  }

  nextPage() {
    console.log('nextPage');
    this.selectedPage++;
    console.log('Page: ' + this.selectedPage);
    this.isLoaded = false;
    this.loadPages(this.selectedPageSize, this.selectedPage);
  }

  prevPage() {
    console.log('prevPage');
    if (this.selectedPage > 0) {
      this.selectedPage--;
      console.log('Page: ' + this.selectedPage);
      this.isLoaded = false;
      this.loadPages(this.selectedPageSize, this.selectedPage);
    }
  }

  constructor(
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log('Constructor');
  }

  loadPages(sizeOfPage: number, currentPage: number) {
    this.isLoaded = false;
    this.cityService.cityPages(sizeOfPage, currentPage).subscribe({
      next: (content: Content) => {
        this.cities = content.content;
        this.totalElements = content.totalElements;
        console.log(this.cities);
        console.log('Total Elements: ' + this.totalElements);
        this.isLoaded = true;
      },
      error: (err: Error) => {
        console.error('Observer got an error: ' + err);
        this.router.navigateByUrl('NotFound');
      },
    });
  }
}
