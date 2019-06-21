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
import { UserService } from '../../services/user.service';
import { HomeService } from '../../services/home.service';
import { TokenEventService } from '../../services/token-event.service';
import { DialogService } from '../../services/dialog.service';
import { CategoryService } from '../../services/category.service';

import * as _ from 'lodash';

// ================================================================

const RoleEnum = {
  PARENT: 1,
  CHILD: 2
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;
  family: any;
  children: any;
  familyRecordForm: any;
  tokenCountMap: any = {};

  //[1, 2, 3].map(() => `https://picsum.photos/1200/500?random&t=${Math.random()}&blur=2&grayscale`);
  images: any;

  constructor(private router: Router,
              private auth: AuthService,
              private userService: UserService,
              private tokenEventService: TokenEventService,
              private dialog: DialogService,
              private categoryService: CategoryService,
              private homeService: HomeService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();

    if (!this.isLoggedIn()) {
      this.initCarouselImages();

    } else if (!this.hasFamily()) {
      this.familyRecordForm = this.createFamilyRecordForm();

    } else {
      this.reload();
    }
  }

  reload() {
    this.userService.getFamilyMembers().subscribe(data => {
      var kids = _.filter(data['members'], x => x.role_id === RoleEnum.CHILD);
      this.children = 0 < kids.length ? kids : this.children;
      this.family = data['family'];

      if (!this.children) this.initCarouselImages();
    });

    this.tokenEventService
      .getChildrenTokenCounts()
      .subscribe(
        data => {
          for (let entry of data) {
            this.tokenCountMap[entry.id] = entry.sum;
          }
        },
        err => console.log('cannot retrieve token counts.')
      );
  }

  initCarouselImages() {
    this.homeService
      .getRandomPhotos({ width: 1200, height: 500, count: 3, orientation: 'landscape', query: 'education' })
      .subscribe(d => {
        this.images = (d as any[]).map(x => x.urls.regular);
      });
  }

  signup() {
    this.router.navigate(['/register'], { queryParams: { returnUrl: '/' }});
  }

  login() {
    this.router.navigate(['/login']);
  }

  isLoggedIn() { return !!this.user; }
  isParent() { return this.isLoggedIn() && RoleEnum.PARENT === this.user.role_id; }
  hasFamily() { return this.isLoggedIn() && !!this.user.family_id; }
  hasChildren() { return this.isLoggedIn() && !!this.children }

  createFamilyRecordForm() {
    return { bindings: { fields: [{ name: 'title',
                                    title: 'Give a name to your family:',
                                    type: 'text',
                                    min: 6,
                                    max: 65,
                                    required: true }] },
             submit: { title: 'Create',
                       click: (record, next) => {
                         this.userService
                           .createFamily(record)
                           .subscribe(data => {
                             var newUser = this.user;
                             newUser.family_id = data['id'];
                             this.auth.updateUser(newUser);
                             next();
                             location.reload();

                           }, err => next(err));
                       }}
           };
  }

  award(id) {
    this.addTokenEvent('Award', { userId: id, amount: 1 });
  }

  punish(id) {
    this.addTokenEvent('Punish', { userId: id, amount: -1 });
  }

  addTokenEvent(title, record) {
    this.dialog
      .open({ title: title,
              style: { size: 'sm', backdrop: 'static' },
              bindings: { fields: [{ name: 'userId',
                                     title: 'Child',
                                     type: 'number',
                                     required: true,
                                     values: (this.userService
                                              .getChildren()
                                              .pipe(
                                                map(records => _.map(records, (x) => this._assignFullName(x))),
                                              )),
                                     displayKey: 'name',
                                     valueKey: 'id' },
                                   { name: 'amount',
                                     title: 'Amount',
                                     type: 'number',
                                     required: true },
                                   { name: 'categoryId',
                                     title: 'Category',
                                     type: 'number',
                                     required: true,
                                     values: this.categoryService.getCategories(),
                                     displayKey: 'label',
                                     valueKey: 'id' },
                                   { name: 'description',
                                     title: 'Description',
                                     type: 'string',
                                     required: true }],
                          record: record
                        },
              submit: { title: 'Add',
                        click: (record, next) => {
                          this.tokenEventService.create(record).subscribe(x => {
                            this.reload();
                            next();
                          }, err => next(err));
                        }},
              cancel: { title: 'Cancel', click: () => {}}
            });
  }

  _assignFullName(record) {
    return Object.assign(record, { name: record.first_name + ' ' + record.last_name });
  }

}
