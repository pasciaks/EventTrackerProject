interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface content {
  content: City[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

import { City } from './city';

export class Content {
  content: City[] = [];
  pageable: Pageable = {
    pageNumber: 0,
    pageSize: 0,
    sort: {
      empty: false,
      sorted: false,
      unsorted: false,
    },
    offset: 0,
    paged: false,
    unpaged: false,
  };
  totalPages: number = 0;
  totalElements: number = 0;
  last: boolean = false;
  size: number = 0;
  number: number = 0;
  sort: object = {};
  numberOfElements: number = 0;
  first: boolean = false;
  empty: boolean = false;

  constructor(
    content: City[] = [],
    pageable: Pageable = {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: false,
        sorted: false,
        unsorted: false,
      },
      offset: 0,
      paged: false,
      unpaged: false,
    },
    totalPages: number = 0,
    totalElements: number = 0,
    last: boolean = false,
    size: number = 0,
    number: number = 0,
    sort: object = {},
    numberOfElements: number = 0,
    first: boolean = false,
    empty: boolean = false
  ) {
    this.content = content;
    this.pageable = pageable;
    this.totalPages = 0;
    this.totalElements = 0;
    this.last = false;
    this.size = 0;
    this.number = 0;
    this.sort = {};
    this.numberOfElements = 0;
    this.first = false;
    this.empty = false;
  }
}
