import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CalendarComponent } from './list-of-movies/calendar/calendar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';
import { SingleMovieComponent } from './list-of-movies/single-movie/single-movie.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { OrderFormComponent } from './order-form/order-form.component';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FootbarComponent } from './footbar/footbar.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MaterialModule } from 'src/material.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CalendarComponent,
    LoginFormComponent,
    ListOfMoviesComponent,
    SingleMovieComponent,
    TruncatePipe,
    OrderFormComponent,
    PageNotFoundComponent,
    FootbarComponent,
    AdminViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
