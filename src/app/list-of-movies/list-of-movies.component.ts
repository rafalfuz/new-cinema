import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movies, Reperoire } from 'models';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { HttpMoviesService } from '../services/http-movies.service';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.css'],
})
export class ListOfMoviesComponent {
  movies: Observable<Reperoire[]> = this.route.paramMap.pipe(
    switchMap((params) => {
      const day = params.get('day');
      return day ? this.http.getMoviesByDay(day) : EMPTY;
    })
  );

  constructor(private http: HttpMoviesService, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.movies = this.route.paramMap.pipe(
  //     switchMap((params) => this.http.getMoviesByDay(params.get('day'))),
  //   );
  // }
}
