import { Component,
	 OnInit,
	 Directive,
         EventEmitter,
         Input,
         Output,
         QueryList,
         ViewChildren } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

// ================================================================

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
