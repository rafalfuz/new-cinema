import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies, Reperoire } from 'models';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpMoviesService {
  private movies$$ = new BehaviorSubject<Movies[] | []>([]);

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.getMovies().subscribe((res) => {
      this.movies$$.next(res);
    });
  }

  get movies$() {
    return this.movies$$.asObservable();
  }

  private getMovies() {
    return this.http.get<Movies[]>(this.url + '/movies');
  }

  getRepertoire(): Observable<Reperoire[]> {
    return this.http.get<Reperoire[]>(this.url + '/reperoire');
  }

  getMoviesByDay(day: string): Observable<Reperoire[]> {
    const result = this.getRepertoire().pipe(
      map((movies) => movies.filter((movie) => movie.day === day))
    );

    return result;
  }

  getMovieRecordByTitle(title: string) {
    return this.http.get(`${this.url}/movies/${title}`);
  }

  getDate(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/week');
  }
}
