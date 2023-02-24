import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movies, Reperoire } from 'models';
import { filter, map, Observable, tap } from 'rxjs';
import { WatchListService } from '../watch-list/watch-list.service';

@Injectable({
  providedIn: 'root',
})
export class HttpMoviesService {
  private url = 'http://localhost:3000';
  private watchListService = inject(WatchListService);

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movies[]> {
    return this.http.get<Movies[]>(this.url + '/movies');
  }

  getRepertoire(): Observable<Reperoire[]> {
    return this.http.get<Reperoire[]>(this.url + '/reperoire');
  }

  getMoviesByDay(day: string): Observable<Reperoire[]> {
    const result = this.getRepertoire().pipe(
      map((movies) => movies.filter((movie) => movie.day === day))
    );
    // .pipe(tap(console.log))

    return result;
  }

  getMovieRecordByTitle(title: string) {
    return this.http.get(`${this.url}/movies/${title}`);
  }

  getMoviesByTitle() {
    return this.http.get(`this.localhost`);
  }

  getDate(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/week');
  }

  // getRepertoireByDay(day:string):Observable<Reperoire>{
  //   return this.getRepertoire().pipe(
  //     filter(repertoires => repertoires.day === day)
  //   )
  // }
}
