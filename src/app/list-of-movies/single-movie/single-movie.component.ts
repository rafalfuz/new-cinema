import { Component, inject, Input } from '@angular/core';
import { Movies, Reperoire } from 'models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { WatchListService } from 'src/app/movies/watch-list/watch-list.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DialogRateComponent } from './dialog-rate/dialog-rate.component';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css'],
})
export class SingleMovieComponent {
  dialog = inject(MatDialog);
  user = inject(AuthService).auth$;
  watchListService = inject(WatchListService);
  toast = inject(ToastrService);
  isFullyBlown = false;
  declaredToWatchList = false;
  @Input() movie!: Reperoire;

  handleVisibiltyDescription() {
    this.isFullyBlown = !this.isFullyBlown;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogRateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleDeclareToWatchList(title: string) {
    //   this.watchListService.getMatchingRecord(title).subscribe({
    //     // next: () => this.toast.error('Ten record juz jest w bazie'),
    //     // error: () => this.removeFromWatchList(title),
    //     next: (data) => {
    //       if (data.length !== 0) {
    //         this.toast.error('Ten record juz jest w bazie');
    //       }
    //     },
    //     error: () => this.removeFromWatchList(title),
    //   });
    // }
    if (this.declaredToWatchList) {
      //Jak tutaj zrobic warunek?
      this.removeFromWatchList(title);
    } else {
      this.addToWatchList(title);
    }
  }

  getAll() {
    return this.watchListService.getAll();
  }

  getSelected(title: string) {
    this.watchListService.getMatchingRecord(title);
    return console.log();
  }

  addToWatchList(title: string) {
    this.watchListService.getMatchingRecord(title).subscribe({
      // next: () => this.toast.error('Ten record juz jest w bazie'),
      // error: () => this.removeFromWatchList(title),
      next: (data) => {
        if (data.length === 0) {
          this.watchListService.addMovieToWatchList(title);
          this.toast.success('Dodano do Chce obejrzeć!');
          this.declaredToWatchList = true;
        }
      },
      error: () => {
        this.toast.error('Ten record juz jest w bazie');
      },
    });
  }

  removeFromWatchList(title: string) {
    this.watchListService.removeFromWatchList(title);
    this.toast.success('Usunięto z Chce obejrzeć!');
    this.declaredToWatchList = false;
  }

  ngOnInit() {}
}
