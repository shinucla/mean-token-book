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

import { TokenEventService } from '../../services/token-event.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { AddTokenEventComponent } from './add-token-event.component';

// ================================================================

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

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

// ================================================================

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {
  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

// ================================================================

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
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

  onSort({column, direction}: SortEvent) {
    console.log(column, direction);
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      // do nothing
    } else {
      this.events = this.events.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
