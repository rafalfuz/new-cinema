import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies, Reperoire } from 'models';
import { Observable } from 'rxjs';
import { HttpMoviesService } from '../services/http-movies.service';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.css']
})
export class ListOfMoviesComponent {
  // movies: Movies[] = []
  movies: Observable<Movies[]>
  constructor(private http: HttpMoviesService, private route: ActivatedRoute){}

  ngOnInit(){
    // this.http.getMovies().subscribe({
    //   next: (response)=>{
    //     this.movies = response
    //   }
    // })
    const day = this.route.snapshot.paramMap.get("day")
    this.movies = this.http.getMoviesByDay(day)
  }

  // getMoviesByDate(day:string){
  //   this.http.getRepertoireByDay(day).subscribe(
  //     {next: (response)=>{
  //       this.movies = response
  //     }}
  //   )
  // }

}
