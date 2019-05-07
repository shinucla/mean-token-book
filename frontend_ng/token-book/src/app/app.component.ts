import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tooken-book';
  user: any;

  constructor(private auth: AuthService) {
    this.user = auth.getUserValue();
  }
}
