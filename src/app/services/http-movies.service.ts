import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies } from 'models';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpMoviesService {

  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getMovies():Observable<Movies[]>{
   return this.http.get<Movies[]>(this.url + '/movies')
  }

  // getMovies():Observable<Movies[]>{
  //   return this.http.get<HttpResponse<Movies[]>>(this.url + '/movies', {observe: 'response'}).
  //   pipe(map(movies => movies.body))
  //  }

}
