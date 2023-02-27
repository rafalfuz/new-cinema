import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reperoire } from 'models';
import { Observable, switchMap } from 'rxjs';
import { HttpMoviesService } from '../movies/services/http-movies.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.css'],
})
export class ListOfMoviesComponent {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  movies: Observable<Reperoire[]> = this.route.paramMap.pipe(
    switchMap((params) => {
      const day = params.get('day');
      return day
        ? this.http.getMoviesByDay(day)
        : this.http.getMoviesByDay('06-12-2022');
    })
  );

  constructor(private http: HttpMoviesService, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.movies = this.route.paramMap.pipe(
  //     switchMap((params) => this.http.getMoviesByDay(params.get('day'))),
  //   );
  // }
}
