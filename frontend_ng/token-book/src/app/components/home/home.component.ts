import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { TokenEventService } from '../../services/token-event.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';

import { IConfirm } from '../../interfaces/IConfirm';

// ================================================================

@Component({
  template: `
<input type="text" />
<input type="password" />
`
})
export class AddTokenEventComponent implements IConfirm {

  //@Override
  onOk() {
    console.log('customized on ok');
  }

  //@Override
  onCancel() {
    console.log('customized on cancel');
  }
}

// ================================================================

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

    if (this.user.family_id) {
      this.tokenEventService
	.getChildrenTokenEvents()
	.pipe(map(events => events.map(event => ({ name: event.user.first_name + ' ' + event.user.last_name,
                                                   category: event.category.label,
                                                   date: event.date,
                                                   amount: event.amount }))))
	.subscribe(events => this.events = events);
    }
  }

  search(text: string): Event[] {
    return [];
  }

  refreshTokenEventList() {

  }

  showAddTokenDialog() {
    this.modalService.show('Create Token Event', AddTokenEventComponent);
  }
}
