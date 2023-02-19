import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMoviesService } from 'src/app/services/http-movies.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  // week: Observable<string[]>
  week!: string[];
  currentDay = '06-12-2022';
  constructor(public http: HttpMoviesService) {
    // this.week = this.http.getDate()
    // this.week = ["06-12-2022", "07-12-2022", "08-12-2022", "09-12-2022", "10-12-2022", "11-12-2022", "12-12-2022"]
    this.week = [
      '06-12-2022',
      '07-12-2022',
      '08-12-2022',
      '09-12-2022',
      '10-12-2022',
      '11-12-2022',
      '12-12-2022',
    ];
  }
  ngOnInit() {}

  // today = Date.now();
  // tomorrow = new Date((new Date()).getTime() + (1 * 86400000))
  // todayAddTwoDays = new Date((new Date()).getTime() + (2 * 86400000))
  // todayAddThreeDays = new Date((new Date()).getTime() + (3 * 86400000))
  // todayAddFourDays= new Date((new Date()).getTime() + (4 * 86400000))
  // todayAddFiveDays = new Date((new Date()).getTime() + (5 * 86400000))
  // todayAddSixDays = new Date((new Date()).getTime() + (6 * 86400000))
}
