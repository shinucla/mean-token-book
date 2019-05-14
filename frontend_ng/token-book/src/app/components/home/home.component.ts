import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenEventService } from '../../services/token-event.service';

interface Event {
  name: string;
  category: string;
  date: number;
  amount: number;
}

const events: Event[] = [
  { name: 'Nicole',
    category: 'Good Behavior',
    date: 20190201,
    amount: 5 },
  { name: 'Nicole',
    category: 'Good Behavior',
    date: 20190202,
    amount: 5 },
  { name: 'Nicole',
    category: 'Good Behavior',
    date: 20190203,
    amount: 5 },
  { name: 'Nicole',
    category: 'Good Behavior',
    date: 20190204,
    amount: 5 },
  { name: 'Nicole',
    category: 'Good Behavior',
    date: 20190205,
    amount: 5 },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Observable<Event[]>;

  constructor(private tokenEventService: TokenEventService) { }

  ngOnInit() {
    //this.tokenEventService.getChildrenTokenEvents().pipe(map(x => new Event { name: x['name'], }));
  }

  search(text: string): Event[] {
    return [];
  }
  
  refreshTokenEventList() {
    
  }

  addTokenEvent() {

  }
}
