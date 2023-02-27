import { Component, inject, Input } from '@angular/core';
import { Movies } from 'models';
import { WatchListService } from '../watch-list.service';

@Component({
  selector: 'app-single-watch-record',
  templateUrl: './single-watch-record.component.html',
  styleUrls: ['./single-watch-record.component.css'],
})
export class SingleWatchRecordComponent {
  @Input() showRecord!: Movies;
  watchListService = inject(WatchListService);
  apiLoaded = false;
  currentVideoId: any;

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  selectVideo(video: Movies) {
    const params = new URL(video.videoId).searchParams;
    this.currentVideoId = params.get('v');
  }

  remove(title: string) {
    this.watchListService.removeFromWatchList(title);
  }
}
