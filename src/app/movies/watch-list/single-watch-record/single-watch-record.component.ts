import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Movies } from 'models';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { WatchListRecord } from '../watch-list.service';
import { WatchListService } from '../watch-list.service';

@Component({
  selector: 'app-single-watch-record[record]',
  templateUrl: './single-watch-record.component.html',
  styleUrls: ['./single-watch-record.component.css'],
})
export class SingleWatchRecordComponent {
  @Input() record!: WatchListRecord;
  watchListService = inject(WatchListService);
  dataMovie!: Movies;
  apiLoaded = false;
  videoId: string = '';
  currentVideoId: any;

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    this.watchListService
      .getMovieRecordByTitle(this.record.movie)
      .subscribe((data: any) => {
        this.dataMovie = data;
        this.videoId = data.videoId;
      });
  }

  selectVideo(video: Movies) {
    const params = new URL(video.videoId).searchParams;
    this.currentVideoId = params.get('v');
  }

  remove(title: string) {
    this.watchListService.removeFromWatchList(title);
    window.location.reload();
  }
}
