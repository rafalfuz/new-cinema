import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent {
  user = inject(AuthService).auth$;
  authValue = inject(AuthService).confirm$;
  authStateService = inject(AuthService);
  durationInSeconds = 5;
}
