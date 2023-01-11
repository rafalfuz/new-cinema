import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movies, Reperoire } from 'models';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpMoviesService } from '../services/http-movies.service';

@Component({
  selector: 'app-list-of-movies',
  templateUrl: './list-of-movies.component.html',
  styleUrls: ['./list-of-movies.component.css']
})
export class ListOfMoviesComponent implements OnInit {
  // movies: Movies[] = []
  //movies!: Observable<Reperoire[]>;
  reperoire!: Observable<Reperoire[]>

  constructor(private http: HttpMoviesService, private route: ActivatedRoute){}

  ngOnInit(){
    
    
  //   this.http.getMovies().subscribe({
  //     next: (response)=>{
  //       this.movies = response
  //     }
  //   })


    // const day = this.route.snapshot.paramMap.get("day")
    // this.http.getMoviesByDay(day)
    // console.log(day)
    // this.movies = this.http.getMoviesByDay(day)
    // console.log(this.movies)
    
    
    // Ten działa cos
    // this.movies = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap)=>
    //   this.http.getMoviesByDay(params.get('day')).pipe(tap(console.log)))
    // )
    

    // this.movies = this.http.getMovies().
    this.reperoire = this.http.getRepertoire()
          }
    // this.reperoire = this.http.getRepertoire()
    // this.reperoire.pipe().subscribe(
    //    (data)=>{
    //     console.log('data')
    //    }
    // )


  // fn(){
  //   console.log('works!')
  //   console.log(this.movies)
  // }

  // getMoviesByDate(day:string){
  //   this.http.getRepertoireByDay(day).subscribe(
  //     {next: (response)=>{
  //       this.movies = response
  //     }}
  //   )
  // }

}
