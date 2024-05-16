export class City {
  id: number = 0;
  city: string = '';
  state: string = '';
  county: string = '';
  lat: number = 0;
  lng: number = 0;
  population: number = 0;
  density: number = 0;
  timezone: string = '';
  ranking: number = 0;
  zips: string = '';
  // task: string = '';
  // description: string = '';
  // completed: boolean = false;

  constructor(
    id: number = 0,
    city: string = '',
    state: string = '',
    county: string = '',
    lat: number = 0,
    lng: number = 0,
    population: number = 0,
    density: number = 0,
    timezone: string = '',
    ranking: number = 0,
    zips: string = ''
    // task: string = '',
    // description: string = '',
    // completed: boolean = false
  ) {
    this.id = id;
    // this.task = task;
    // this.description = description;
    // this.completed = completed;
    this.city = city;
    this.state = state;
    this.county = county;
    this.lat = lat;
    this.lng = lng;
    this.population = population;
    this.density = density;
    this.timezone = timezone;
    this.ranking = ranking;
    this.zips = zips;
  }
}
