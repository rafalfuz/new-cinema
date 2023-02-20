import { inject, NgModule } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './list-of-movies/calendar/calendar.component';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AuthService } from './auth/auth.service';
import { map, tap } from 'rxjs';
import { adminAuthGuard } from './auth/admin-auth.guard';

const routes: Routes = [
  {
    // path: '', redirectTo: 'day', pathMatch:'full'},
    path: '',
    redirectTo: 'repertoire',
    pathMatch: 'full',
    // component: ListOfMoviesComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'bucket-list',
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'form',
    component: OrderFormComponent,
  },
  {
    path: 'today',
    component: OrderFormComponent,
  },
  {
    path: 'repertoire',
    component: ListOfMoviesComponent,
  },
  {
    path: 'repertoire/:day',
    component: ListOfMoviesComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
