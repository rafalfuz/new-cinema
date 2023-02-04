import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from 'models';

type AuthType = 'none' | 'admin' | 'customer';
type AuthState = { auth: AuthType; user: User | null };

export type LoginCredentials = { email: string; password: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private loginUrl = 'http://localhost:3000/user';

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application.json',
    });
    const data = { username, password };
    return this.http.post<any>(this.loginUrl, data, { headers });
  }

  loginSimpleWay(loginData: { email: string; password: string }) {
    return this.http.post('localhost:3000/user', loginData);
  }

  // private router = inject(Router);
  private auth$$ = new BehaviorSubject<AuthState>({
    auth: 'customer',
    user: {
      id: 1,
      name: 'Rafał',
      password: 'mambojambo',
      authType: 'customer',
    },
  });

  get auth$() {
    return this.auth$$.asObservable();
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
}
