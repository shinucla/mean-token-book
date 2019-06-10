import { Component,
	 OnInit,
	 Directive,
         EventEmitter,
         Input,
         Output,
         QueryList,
         ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';

// ================================================================

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;
  images = [1, 2, 3].map(() => `https://picsum.photos/1200/500?random&t=${Math.random()}&blur=3`);
  
  constructor(private router: Router,
	      private auth: AuthService,
	      private homeService: HomeService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
    //this.homeService.getRandomPhotos().subscribe(d => {
    //  this.images = d.map(x => x.urls.full);
    //});
  }

  signup() {
    this.router.navigate(['/register'], { queryParams: { returnUrl: '/' }});
  }

  login() {
    this.router.navigate(['/login']);
  }
}
