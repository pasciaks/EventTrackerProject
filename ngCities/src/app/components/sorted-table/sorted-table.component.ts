import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { City } from '../../models/city';

// interface Country {
//   id: number;
//   name: string;
//   flag: string;
//   area: number;
//   population: number;
// }

// const COUNTRIES: Country[] = [
//   {
//     id: 1,
//     name: 'Russia',
//     flag: 'f/f3/Flag_of_Russia.svg',
//     area: 17075200,
//     population: 146989754,
//   },
//   {
//     id: 2,
//     name: 'Canada',
//     flag: 'c/cf/Flag_of_Canada.svg',
//     area: 9976140,
//     population: 36624199,
//   },
//   {
//     id: 3,
//     name: 'United States',
//     flag: 'a/a4/Flag_of_the_United_States.svg',
//     area: 9629091,
//     population: 324459463,
//   },
//   {
//     id: 4,
//     name: 'China',
//     flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
//     area: 9596960,
//     population: 1409517397,
//   },
// ];

export type SortColumn = keyof City | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (
  v1: string | number | boolean,
  v2: string | number | boolean
) => {
  if (typeof v1 !== typeof v2) {
    return 0;
  }
  if (typeof v1 === 'boolean') {
    return 0;
  }
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
};
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'ngbd-table-sortable',
  standalone: true,
  imports: [DecimalPipe, NgbdSortableHeader],
  templateUrl: './sorted-table.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortedTableComponent implements OnInit {
  ngOnInit(): void {}

  // countries = COUNTRIES;

  @Input() cities: City[] = [];

  constructor(private cd: ChangeDetectorRef) {
    this.headers = new QueryList<NgbdSortableHeader>();
  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>; // = new QueryList<NgbdSortableHeader>();

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    // sorting countries
    if (direction === '' || column === '') {
      console.log('Resetting');
    } else {
      console.log('Sorting');

      //this.cities = this.cities.reverse().reverse();

      let newCities: City[] = [];

      for (let i = 0; i < this.cities.length; i++) {
        console.log({ ...this.cities[i] });
        newCities.push({ ...this.cities[i] });
      }

      // NOTE: UTAH and Rhode Island, possibly other states sort fine.
      // NOTE: Illinois and other states with many cities freeze the app!

      newCities = newCities.sort((a, b) => {
        // sorts in place array
        let res = 0;

        if (typeof a[column] === 'number' && typeof b[column] === 'number') {
          if (Number(a[column]) === Number(b[column])) {
            res = 0;
          } else {
            res = Number(a[column]) < Number(b[column]) ? -1 : 1;
          }
        }

        if (typeof a[column] === 'string' && typeof b[column] === 'string') {
          if (a[column] < b[column]) {
            res = -1;
          } else if (a[column] > b[column]) {
            res = 1;
          } else {
            res = 0;
          }
        }
        return direction === 'asc' ? res : -res;
      });

      this.cities = [];

      for (let j = 0; j < newCities.length; j++) {
        this.cities.push({ ...newCities[j] });
      }

      // this.cities =
      //   this?.cities?.sort((a, b) => {
      //     let t1: string = typeof a[column];
      //     let t2: string = typeof b[column];
      //     console.log(t1);
      //     console.log(t2);
      //     let res = 0;
      //     if (a[column] < b[column]) {
      //       res = -1;
      //     } else if (a[column] > b[column]) {
      //       res = 1;
      //     } else {
      //       res = 0;
      //     }
      //     //const res = compare(a[column], b[column]);
      //     return direction === 'asc' ? res : -res;
      //   }) || [];
    }
  }
}
