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

// ================================================================

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private router: Router,
	      private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
  }

  signup() {
    this.router.navigate(['/register'], { queryParams: { returnUrl: '/' }});
  }

  login() {
    this.router.navigate(['/login']);
  }
}
