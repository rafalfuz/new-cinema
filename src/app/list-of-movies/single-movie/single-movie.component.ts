import { Component, inject, Input } from '@angular/core';
import { Movies, Reperoire } from 'models';
import { AuthService } from 'src/app/auth/auth.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css'],
})
export class SingleMovieComponent {
  auth = inject(AuthService).auth$;
  visitorType: string = '';
  isFullyBlown = false;

  @Input() movie!: Reperoire;

  handleVisibiltyDescription() {
    this.isFullyBlown = !this.isFullyBlown;
  }

  ngOnInit() {
    // this.auth.auth$.subscribe((data) => {
    //   this.visitorType = data.auth;
    // });
  }
}
