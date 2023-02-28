import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, skip, tap } from 'rxjs';
import { User } from 'models';
import { ToastrService } from 'ngx-toastr';

export type LoginCredentials = { email: string; password: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private toast = inject(ToastrService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiurl = 'http://localhost:3000/user';
  private user$$ = new BehaviorSubject<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
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

  get authValue() {
    return this.confirm$$.value;
  }

  getAll() {
    return this.http.get(this.apiurl);
  }

  getByCode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }

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

  handleNoAuthState() {
    this.router.navigate(['/noAccess']);
  }

  getConfirm(): { hasAuth: boolean } {
    return this.confirm$$.getValue();
  }
}
