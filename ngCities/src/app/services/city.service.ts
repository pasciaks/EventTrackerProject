import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { City } from '../models/city';
import { environment } from '../../environments/environment';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl = environment.baseUrl; //'http://localhost:8083/'; // adjust port to match server
  private url = this.baseUrl + 'api/cities'; // change 'todos' to your API path

  constructor(private http: HttpClient) {}

  // ng serve -o --port=4201 --configuration=development

  // ng build --base-href=/CityStatsREST/
  // ng build --base-href=/CityStatsREST/ --prod
  // cp -rp dist/ng-cities/browser/* ~/SD/Java/EventTracker/CityStatsREST/src/main/resources/static/

  //   Next Steps
  // Do a commit of what you've done so far.
  // Install Bootstrap in the project if you like.
  // Think about how you want the front end to work (the ngTodo project is a good template to start with but feel free to be creative - this is your portfolio project.)
  // Start creating model classes, then components, etc.
  // Implement service methods to consume your REST API endpoints, accessing each in your component(s).

  index(): Observable<City[]> {
    return this.http.get<City[]>(this.url + '').pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () => new Error('.index(): error retrieving cities: ' + err)
        );
      })
    );
  }

  //localhost:8083/api/citypages?pageSize=2&pageNumber=1
  cityPages(pageSize: number, pageNumber: number): Observable<Content> {
    return this.http
      .get<Content>(
        this.baseUrl +
          `api/citypages?pageSize=${pageSize}&pageNumber=${pageNumber}`
      )
      .pipe(
        catchError((err: any) => {
          alert(JSON.stringify(err));
          return throwError(
            () => new Error('.cityPages(): error retrieving cityPages: ' + err)
          );
        })
      );
  }

  // localhost:8083/api/cities/states/New Hampshire
  citiesInState(stateName: string): Observable<City[]> {
    return this.http.get<City[]>(this.url + '/states/' + stateName).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () =>
            new Error('citiesInState.index(): error retrieving cities: ' + err)
        );
      })
    );
  }

  show(id: number): Observable<City> {
    return this.http.get<City>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () => new Error('.show(): error retrieving city: ' + err)
        );
      })
    );
  }

  create(city: City): Observable<City> {
    return this.http.post<City>(this.url, city).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () => new Error('.create(): error creating city: ' + err)
        );
      })
    );
  }

  update(city: City): Observable<City> {
    return this.http.put<City>(this.url + '/' + city.id, city).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () => new Error('.update(): error updating city: ' + err)
        );
      })
    );
  }

  destroy(city: City): Observable<City> {
    return this.http.delete<City>(this.url + '/' + city.id).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () => new Error('.destroy(): error deleting city: ' + err)
        );
      })
    );
  }
}
