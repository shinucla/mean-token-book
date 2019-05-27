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
import { DialogService } from '../../services/dialog.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';

import * as _ from 'lodash';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  user: any;
  RoleEnum = RoleEnum;
  events: Event[] = [];

  constructor(private auth: AuthService,
	      private userService: UserService,
	      private categoryService: CategoryService,
              private tokenEventService: TokenEventService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
    this.reload();
  }

  search(text: string): Event[] {
    return [];
  }

  reload() {
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

  _assignFullName(record) {
    return Object.assign(record, { name: record.first_name + ' ' + record.last_name });
  }
  
  showAddTokenDialog() {
    this.dialogService.open({ title: 'Create Token Event',
                              style: { size: 'md', backdrop: 'static' },
			      bindings: { fields: [{ name: 'userId', title: 'Child', type: 'number',
						     values: (this.userService
							      .getChildren()
							      .pipe(
								map(records => _.map(records, (x) => this._assignFullName(x)))
							      )),
						     displayKey: 'name',
						     valueKey: 'id' },
						   { name: 'amount', title: 'Amount', type: 'number' },
						   { name: 'categoryId', title: 'Category', type: 'number',
						     values: this.categoryService.getCategories(),
						     displayKey: 'label',
						     valueKey: 'id' },
						   { name: 'description', title: 'Description', type: 'string' }],
					},
			      onOk: (record, closeCallBack) => {
				this.tokenEventService.create(record).subscribe(x => {
				  this.reload();
				  closeCallBack();
				});
			      }
			    });
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
