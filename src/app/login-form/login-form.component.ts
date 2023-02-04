import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'models';
import { AuthService, LoginCredentials } from '../auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private builder = inject(NonNullableFormBuilder);
  private router = inject(Router);
  form = this.createForm();

  private createForm() {
    return this.builder.group({
      email: this.builder.control('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this.builder.control('', {
        validators: [Validators.required],
      }),
    });
  }

  get emailCtrl() {
    return this.form.controls.email;
  }

  get passwordCtrl() {
    return this.form.controls.password;
  }

  getEmailSuccessMessage() {
    return 'great!';
  }

  getEmailErrorMessage() {
    if (this.emailCtrl.hasError('required')) {
      return 'To pole jest obowiązkowe';
    }
    return this.emailCtrl.hasError('email') ? 'Nieprawidłowy adres email' : '';
  }

  // login() {
  //   this.form.markAllAsTouched();
  //   if (this.form.valid) {
  //     this.authService.login(this.form.value as LoginCredentials);
  //     // this.router.navigate(['/']);
  //   }
  // }

  // login() {
  //   this.form.markAllAsTouched();
  //   if (this.form.valid) {
  //     this.authService
  //       .loginSimpleWay(this.form.value as LoginCredentials)
  //       .subscribe(
  //         (suc) => {
  //           console.log(suc);
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //   }
  // }

  login() {
    this.authService
      .login(this.form.value.email!, this.form.value.password!)
      .subscribe((data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
      });
  }
}
