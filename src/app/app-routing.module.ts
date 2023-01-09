import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './list-of-movies/calendar/calendar.component';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
  {
    // path: '', redirectTo: 'day', pathMatch:'full'},
    path: "", component: ListOfMoviesComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'form',
    component: OrderFormComponent
  },
  {
    path: 'today',
    component: OrderFormComponent
  },
  {
    path: 'repertoire/:day',
    component: ListOfMoviesComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
