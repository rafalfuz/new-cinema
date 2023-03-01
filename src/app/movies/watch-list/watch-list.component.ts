import { Component, inject } from '@angular/core';
import { Movies } from 'models';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

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
  authService = inject(AuthService);

  listOfAllMoviesInDB$ = this.watchListService.watchList$;
  currentUser$ = this.authService.auth$;
  showList!: Observable<Movies[]>;

  ngOnInit() {
    this.showList = combineLatest([
      this.httpMovieService.movies$,
      this.listOfAllMoviesInDB$,
      this.currentUser$,
    ]).pipe(
      switchMap(([listOfAllMoviesInDB, moviesInState, currentUser]) => {
        return of({ listOfAllMoviesInDB, moviesInState, currentUser });
      }),
      map(({ moviesInState, listOfAllMoviesInDB, currentUser }) => {
        const matchingRecordsInMoviesInStateToUsers = moviesInState.filter(
          (movieInState) => movieInState.idUser === currentUser.id
        );
        const movieTitlesFromList = matchingRecordsInMoviesInStateToUsers.map(
          (result) => result.movie
        );
        return listOfAllMoviesInDB.filter((movie) =>
          movieTitlesFromList.includes(movie.id)
        );
      })
    );
  }
}

// ngOnInit() {
//   this.showList = combineLatest([
//     this.httpMovieService.movies$,
//     this.listOfAllMoviesInDB$,
//     this.currentUser$
//   ]).pipe(
//     switchMap(([moviesInState, listOfAllMoviesInDB, currentUser]) => {
//       return of({ moviesInState, listOfAllMoviesInDB, currentUser });
//     }),
//     map(({ moviesInState, listOfAllMoviesInDB, currentUser }) => {
//       const movieTitlesFromList = listOfAllMoviesInDB.map(
//         (result) => result.movie
//       );

//       return moviesInState.filter((movieInState) =>
//         movieTitlesFromList.includes(movieInState.id)
//       );
//     })
//   );
// }
// }
