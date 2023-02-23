import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, skip, tap } from 'rxjs';
import { User } from 'models';
import { AuthResponse } from './auth-response.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthType } from 'models';

export type LoginCredentials = { email: string; password: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    // this.setStateFromLocalStorage();
    // this.onHasAuthChange();
    // this.logoutCallBetterLaterThisFn();
  }
  private toast = inject(ToastrService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiurl = 'http://localhost:3000/user';
  private user$$ = new BehaviorSubject<User>({
    id: '',
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

  get userId() {
    return this.user$$.subscribe((data) => data.id);
  }

  get selectUserId$() {
    return this.user$$.pipe(map((user) => user.id));
  }

  getUserName() {
    return this.user$$.subscribe((data) => console.log(data.name));
  }

  get authValue() {
    return this.confirm$$.value;
  }

  getAll() {
    return this.http.get(this.apiurl);
  }

  getByCode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }

  // login(credentials: { email: string; password: string }) {
  //   return this.http
  //     .post<AuthResponse>('http://localhost:3000/log', {
  //       email: credentials.email,
  //       password: credentials.password,
  //     })
  //     .pipe(
  //       tap({
  //         next: (res) => {
  //           localStorage.setItem('token', res.token);
  //           this.confirm$$.next({ hasAuth: true });
  //           this.router.navigate(['']);
  //           alert('Zostałes zalogowany');
  //         },
  //         error: () => {
  //           alert('error');
  //         },
  //       })
  //     );
  // }

  log(user: User) {
    this.confirm$$.next({ hasAuth: true });
    this.user$$.next(user);
    this.router.navigate(['']);
  }

  autoLogin() {
    console.log('AutoLoggin works!');
    if (localStorage.getItem('userId')) {
      this.confirm$$.next({ hasAuth: true });
      this.user$$.next({
        ...this.user$$.value,
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('userName'),
        role: localStorage.getItem('userRole'),
      });
    }
  }

  logout() {
    localStorage.clear();

    this.confirm$$.next({ hasAuth: false });
    this.user$$.next({
      id: '',
      name: '',
      email: '',
      password: '',
      role: 'none',
    });
    this.router.navigate(['/']);
    this.toast.success('Zostałes poprawnie wylogowany');
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
