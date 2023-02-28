import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies, Reperoire } from 'models';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpMoviesService {
  pipe(arg0: any): string {
    throw new Error('Method not implemented.');
  }
  private movies$$ = new BehaviorSubject<Movies[] | []>([]);
  private week$$ = new BehaviorSubject<string[]>([
    '06-12-2022',
    '07-12-2022',
    '08-12-2022',
    '09-12-2022',
    '10-12-2022',
    '11-12-2022',
    '12-12-2022',
  ]);
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.getMovies().subscribe((res) => {
      this.movies$$.next(res);
    });
  }

  get week$() {
    return this.week$$.asObservable();
  }

  getToday() {
    let today = '';
    this.week$$.subscribe((data) => {
      today = data[0];
    });
    return today;
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

  getMoviesByStart(): Observable<Reperoire[]> {
    const today = this.getToday();
    const result = this.getRepertoire().pipe(
      map((movies) => movies.filter((movie) => movie.day === today))
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
