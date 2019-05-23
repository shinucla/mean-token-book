import { Component, OnInit, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenEventService } from '../../services/token-event.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { AddTokenEventComponent } from './add-token-event.component';

interface Event {
  name: string;
  category: string;
  date: number;
  amount: number;
}

const RoleEnum = {
  PARENT: 1,
  CHILD: 2,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;

  RoleEnum = RoleEnum;
  events: Event[] = [];

  constructor(private auth: AuthService,
	      private tokenEventService: TokenEventService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
    this.refreshTokenEventList();
  }

  search(text: string): Event[] {
    return [];
  }

  refreshTokenEventList() {
    if (this.user.family_id) {
      this.tokenEventService
	.getChildrenTokenEvents()
	.pipe(map(events => events.map(event => ({ name: event.user.first_name + ' ' + event.user.last_name,
                                                   category: event.category.label,
                                                   date: event.date,
                                                   amount: event.amount,
						   description: event.description }))))
	.subscribe(events => this.events = events);
    }
  }

  showAddTokenDialog() {
    this.modalService.show(AddTokenEventComponent,
			   { title: 'Create Token Event',
			     style: { size: 'md', backdrop: 'static' }});
  }
}
