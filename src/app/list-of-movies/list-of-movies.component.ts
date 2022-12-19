import { Component } from '@angular/core';
import { Movies } from 'models';
import { HttpMoviesService } from '../services/http-movies.service';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.css']
})
export class ListOfMoviesComponent {
  movies: Movies[] = []
  constructor(private http: HttpMoviesService){}

  ngOnInit(){
    this.http.getMovies().subscribe({
      next: (response)=>{
        this.movies = response
      }
    })
  }
}
