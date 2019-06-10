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
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  
  constructor(private auth: AuthService) {
    this.user = auth.getUserValue();
  }

  getMainPanelClass() {
    return (!!this.user ? "col-sm-11 col-md-9 ml-sm-auto" : "col-12");
  }
}
