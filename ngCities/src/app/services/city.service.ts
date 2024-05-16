import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl = 'http://localhost:8083/'; // adjust port to match server
  private url = this.baseUrl + 'api/cities'; // change 'todos' to your API path

  constructor(private http: HttpClient) {}

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
          () =>
            new Error(
              'PokemonService.index(): error retrieving pokemon: ' + err
            )
        );
      })
    );
  }

  show(id: number): Observable<City> {
    return this.http.get<City>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () =>
            new Error('PokemonService.show(): error retrieving pokemon: ' + err)
        );
      })
    );
  }

  create(city: City): Observable<City> {
    return this.http.post<City>(this.url, city).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () =>
            new Error('PokemonService.create(): error creating pokemon: ' + err)
        );
      })
    );
  }

  update(city: City): Observable<City> {
    return this.http.put<City>(this.url + '/' + city.id, city).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () =>
            new Error('PokemonService.update(): error updating pokemon: ' + err)
        );
      })
    );
  }

  destroy(city: City): Observable<City> {
    return this.http.delete<City>(this.url + '/' + city.id).pipe(
      catchError((err: any) => {
        alert(JSON.stringify(err));
        return throwError(
          () =>
            new Error(
              'PokemonService.destroy(): error deleting pokemon: ' + err
            )
        );
      })
    );
  }
}
