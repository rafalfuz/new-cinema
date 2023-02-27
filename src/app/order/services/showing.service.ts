import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ShowingDatas } from 'models';
import { from, of, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowingService {
  private http = inject(HttpClient);
  private showing$$ = new ReplaySubject<ShowingDatas>(1);
  private url = 'http://localhost:3000/showings/';

  constructor() {}

  fetchShowingByShowingId(showingId: string) {
    return this.http
      .get<ShowingDatas>(`${this.url}${showingId}?_expand=room&_expand=movie`)
      .subscribe((data) => {
        this.showing$$.next(data);
        return this.showing$$;
      });
  }
}
