import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ShowingDatas } from 'models';
import { EMPTY, from, Observable, of, switchMap } from 'rxjs';
import { ShowingService } from '../../services/showing.service';

@Component({
  standalone: true,
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ReservationComponent {
  private route = inject(ActivatedRoute);
  showingService = inject(ShowingService);
  data!: Observable<ShowingDatas>;
  ngOnInit() {
    console.log(this.route.snapshot.params);
    // this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     const showingId = params.get('showingId');
    //     console.log('Parammap', params);
    //     return showingId
    //       ? of(this.showingService.fetchShowingByShowingId(showingId))
    //       : of(console.log('cos nie tak Rafał'));
    //   })
    // ); DO MUZEUM
  }
}
