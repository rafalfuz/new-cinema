import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies, Reperoire } from 'models';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpMoviesService {

  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getMovies():Observable<Movies[]>{
   return this.http.get<Movies[]>(this.url + '/movies')
  }
  

  getRepertoire():Observable<Reperoire[]>{
   return this.http.get<Reperoire[]>(this.url + '/reperoire')
  }

  getMoviesByDay(day: string | any):Observable<Reperoire[]>{
    
    const result =  this.getRepertoire().pipe(
      map(movies => movies.filter(movie => movie.day === day)))
     // .pipe(tap(console.log))
    
      
      return result;
  }
  
  getDate():Observable<string[]>{
    return this.http.get<string[]>(this.url + '/week')
  }

  // getRepertoireByDay(day:string):Observable<Reperoire>{
  //   return this.getRepertoire().pipe(
  //     filter(repertoires => repertoires.day === day)
  //   )
  // }

}
