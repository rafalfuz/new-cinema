import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpMoviesService } from 'src/app/movies/services/http-movies.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  week!: string[];
  currentDay!: string;
  weekArr = inject(HttpMoviesService);
  route = inject(Router);

  ngOnInit() {
    const subscription = this.weekArr.week$.subscribe((data) => {
      this.week = data;
      this.currentDay = data[0];
    });

    subscription.unsubscribe();
  }
}
