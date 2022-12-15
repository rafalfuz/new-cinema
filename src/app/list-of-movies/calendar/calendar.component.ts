import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  today = Date.now();
  tomorrow = new Date((new Date()).getTime() + (1 * 86400000))
  todayAddTwoDays = new Date((new Date()).getTime() + (2 * 86400000))
  todayAddThreeDays = new Date((new Date()).getTime() + (3 * 86400000))
  todayAddFourDays= new Date((new Date()).getTime() + (4 * 86400000))
  todayAddFiveDays = new Date((new Date()).getTime() + (5 * 86400000)) 
  todayAddSixDays = new Date((new Date()).getTime() + (6 * 86400000)) 
}
