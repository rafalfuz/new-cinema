import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, skip, tap } from 'rxjs';
import { User } from 'models';
import { AuthResponse } from './auth-response.interface';

export type LoginCredentials = { email: string; password: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiurl = 'http://localhost:3000/user';
  private user$$ = new BehaviorSubject<User>({
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'none',
  });
  private confirm$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get confirm$() {
    return this.confirm$$.asObservable();
  }

  get auth$() {
    return this.user$$.asObservable();
  }

  getUserName() {
    return this.user$$.subscribe((data) => console.log(data));
  }

  get authValue() {
    return this.confirm$$.value;
  }

  getAllUsers() {
    return this.http.get(this.apiurl);
  }

  getByCode(code: number) {
    return this.http.get(this.apiurl + '/' + code);
  }

  constructor() {
    this.setStateFromLocalStorage();
    this.onHasAuthChange();
    this.logoutCallBetterLaterThisFn();
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>('http://localhost:3000/log', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        tap({
          next: (res) => {
            localStorage.setItem('token', res.token);
            this.confirm$$.next({ hasAuth: true });
            this.router.navigate(['']);
            alert('Zostałes zalogowany');
          },
          error: () => {
            alert('error');
          },
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.confirm$$.next({ hasAuth: false });
  }
  // private router = inject(Router);

  handleNoAuthState() {
    this.router.navigate(['/']);
  }

  private logoutCallBetterLaterThisFn() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd && event.url === '/repertoire'
        )
      )
      .subscribe(() => {
        this.logout();
      });
  }

  private onHasAuthChange() {
    this.confirm$$.pipe(skip(1)).subscribe((authState) => {
      if (!authState.hasAuth) {
        this.handleNoAuthState();
      }
    });
  }

  private setStateFromLocalStorage() {
    if (localStorage.getItem('token')) {
      this.confirm$$.next({ hasAuth: true });
    }
  }
}
