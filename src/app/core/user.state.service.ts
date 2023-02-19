import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  authType: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private user$$ = new ReplaySubject<User>(1);

  get user$() {
    return this.user$$.asObservable();
  }

  addUser(user: User) {
    this.user$$.next(user);
  }
}
