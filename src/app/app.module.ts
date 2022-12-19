import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CalendarComponent } from './list-of-movies/calendar/calendar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ListOfMoviesComponent } from './list-of-movies/list-of-movies.component';
import { SingleMovieComponent } from './list-of-movies/single-movie/single-movie.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { OrderFormComponent } from './order-form/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CalendarComponent,
    LoginFormComponent,
    ListOfMoviesComponent,
    SingleMovieComponent,
    TruncatePipe,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
