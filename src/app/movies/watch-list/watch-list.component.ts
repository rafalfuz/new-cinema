import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpMoviesService } from '../services/http-movies.service';
import { WatchListService } from './watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent {
  authService = inject(AuthService);
  watchListService = inject(WatchListService);
  movieService = inject(HttpMoviesService);

  list$ = this.watchListService.getRecordsByUsersName();

  watchList$ = this.watchListService.fetchWatchList();
  ngOnInit() {}
}
