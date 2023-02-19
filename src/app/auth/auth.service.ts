import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, skip, tap } from 'rxjs';
import { User } from 'models';
import { AuthResponse } from './auth-response.interface';

type AuthType = 'none' | 'admin' | 'customer';
type AuthState = { auth: AuthType; user: User | null };
type UserState = { auth: boolean; list: string[] };
export type LoginCredentials = { email: string; password: string };

// userState$$ = new BehaviorSubject<UserState>({auth: false, list: []})

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiurl = 'http://localhost:3000/user';
  private auth$$ = new BehaviorSubject<AuthState>({
    auth: 'customer',
    user: {
      id: 1,
      name: 'Rafał',
      email: 'rafalfuz@gmail.com',
      password: 'mambojambo',
      authType: 'customer',
    },
  });

  private confirm$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get confirm$() {
    return this.confirm$$.asObservable();
  }

  get authValue() {
    return this.confirm$$.value;
  }

  // login(username: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application.json',
  //   });
  //   const data = { username, password };
  //   return this.http.post<any>(this.loginUrl, data, { headers });
  // }

  // loginSimpleWay(loginData: { email: string; password: string }) {
  //   return this.http.post('localhost:3000/user', loginData);
  // }
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

  get auth$() {
    return this.auth$$.asObservable();
  }

  getUserName() {
    return this.auth$$.subscribe((data) => data.user?.name);
  }

  // get currentUser() {
  //   return this.auth$$.pipe(map((state) => state.user));
  // }

  // autoLogin() {
  //   this.http.get<User>('localhost:3000/user').subscribe({
  //     next: (user) => this.setUser(user),

  //     error: () => this.auth$$.next({ auth: 'none', user: null }),
  //   });
  // }

  // login(userCredentials: LoginCredentials) {
  //   return this.http
  //     .post<User>('http://localhost:3000/user', userCredentials)

  //     .subscribe({
  //       next: (user) => {
  //         this.setUser(user);
  //         this.router.navigate(['/']);
  //         console.log();
  //       },
  //     });
  // }

  // private setUser(user: User) {
  //   this.auth$$.next({
  //     ...this.auth$$.value,
  //     auth: user.authType ?? 'none',
  //     user: user,
  //   });
  // }

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

  ///HINDI

  getAll() {
    return this.http.get(this.apiurl);
  }

  getByCode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }
}
