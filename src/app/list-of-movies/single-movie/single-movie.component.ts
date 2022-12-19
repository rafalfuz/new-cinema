import { Component, Input } from '@angular/core';
import { Movies } from 'models';
import { TruncatePipe } from '../../pipes/truncate.pipe'

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent {
  @Input() movie!: Movies

  isFullyBlown = false
  
  handleVisibiltyDescription(){
    this.isFullyBlown = !this.isFullyBlown
  
   }
}
