import { Component, inject } from '@angular/core';
import { Movies } from 'models';
import { combineLatest, map, Observable, of, switchMap, takeLast } from 'rxjs';

import { HttpMoviesService } from '../services/http-movies.service';
import { WatchListService } from './watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent {
  watchListService = inject(WatchListService);
  httpMovieService = inject(HttpMoviesService);
  list$ = this.watchListService.getRecordsByUsersName();
  showList!: Observable<Movies[]>;

  ngOnInit() {
    this.showList = combineLatest([
      this.httpMovieService.movies$,
      this.list$,
    ]).pipe(
      switchMap(([movies, list]) => {
        return of({ movies, list });
      }),
      map(({ movies, list }) => {
        const movieTitlesFromList = list.map((result) => result.movie);
        return movies.filter((movie) => movieTitlesFromList.includes(movie.id));
      })
    );
  }
}
