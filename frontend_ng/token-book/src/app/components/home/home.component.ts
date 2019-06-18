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
  familyRecordForm;

  //[1, 2, 3].map(() => `https://picsum.photos/1200/500?random&t=${Math.random()}&blur=2&grayscale`);
  images = [];

  constructor(private router: Router,
              private auth: AuthService,
	      private userService: UserService,
              private homeService: HomeService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();

    if (!this.user) {
      this.homeService
	.getRandomPhotos({ width: 1200, height: 500, count: 3, orientation: 'landscape', query: 'education' })
	.subscribe(d => {
          this.images = (d as any[]).map(x => x.urls.regular);
	});
    } else if (!this.user.family_id) {
      this.familyRecordForm = this.createFamilyRecordForm();

    } else {
      this.userService.getFamilyMembers().subscribe(data => {
        this.family = data['family'];
        this.children = _.filter(data['members'], x => x.role_id === RoleEnum.CHILD);
      });
    }
  }

  signup() {
    this.router.navigate(['/register'], { queryParams: { returnUrl: '/' }});
  }

  login() {
    this.router.navigate(['/login']);
  }

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
}
