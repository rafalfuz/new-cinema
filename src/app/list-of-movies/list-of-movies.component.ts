import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reperoire } from 'models';
import { EMPTY, Observable, switchMap } from 'rxjs';
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

  private repertuare = inject(HttpMoviesService);
  private actRoute = inject(ActivatedRoute);
  private route = inject(Router);
  today = inject(HttpMoviesService).getToday();
  movies: Observable<Reperoire[]> = this.actRoute.paramMap.pipe(
    switchMap((params) => {
      const day = params.get('day');

      return day
        ? this.repertuare.getMoviesByDay(day)
        : // : EMPTY
          this.repertuare.getMoviesByStart();
    })
  );

  ngOnInit() {
    this.route.navigate([`repertoire/${this.today}`]);
  }
}
