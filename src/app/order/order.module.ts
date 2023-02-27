import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ReservationComponent } from './views/reservation/reservation.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderComponent,
        children: [
          // {
          //   path: '',
          //   redirectTo: 'reservation',
          //   pathMatch: 'full',
          // },
          {
            path: ':id/:day/:time/:roomId',
            component: ReservationComponent,
          },
        ],
      },
    ]),
  ],
})
export default class OrderModule {}
