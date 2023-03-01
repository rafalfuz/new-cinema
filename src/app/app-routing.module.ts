import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';
import { LoginFormComponent } from './core/auth/login-form/login-form.component';
import { OrderFormComponent } from './movies/order-form/order-form.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AdminViewComponent } from './admin/admin-view.component';
import { WatchListComponent } from './movies/watch-list/watch-list.component';
import { AdminGuard } from './core/auth/admin-auth.guards';

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
    path: 'watch-list',
    component: WatchListComponent,
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'form',
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
    path: 'reservation',
    loadChildren: () => import('./order/order.module'),
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
