import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenEventService } from '../../services/token-event.service';
import { ModalService } from '../../services/modal.service';

import { HeaderComponent } from '../header/header.component';

interface Event {
  name: string;
  category: string;
  date: number;
  amount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  constructor(private tokenEventService: TokenEventService,
	      private modalService: ModalService) { }

  ngOnInit() {
    this.tokenEventService
      .getChildrenTokenEvents()
      .pipe(map(events => events.map(event => ({ name: event.user.first_name + ' ' + event.user.last_name,
      							 category: event.category_id,
      							 date: event.date,
      						 amount: event.amount }))))
      .subscribe(events => this.events = events)
    ;
  }

  search(text: string): Event[] {
    return [];
  }

  refreshTokenEventList() {

  }

  addTokenEvent(frmContent) {
    this.modalService.show("Hello", null, null, null);
  }
}
  
