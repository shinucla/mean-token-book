import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../services/dialog.service';

const RoleEnum = {
  PARENT: 1,
  CHILD: 2
};

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  user: any;
  family: any;
  members: any;
  recordForm: any;

  RoleEnum = RoleEnum;
  
  constructor(private userService: UserService,
              private auth: AuthService,
              private dialog: DialogService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();

    if (this.user.family_id) {
      this.userService.getFamilyMembers().subscribe(data => {
        this.family = data['family'];
        this.members = data['members'];
      });

    } else {
      this.recordForm = { bindings: { fields: [{ name: 'title', title: 'Title', type: 'text', required: true }] },
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

  navToRegisterFamilyMember() {
    this.router.navigate(['/registerFamilyMember']);
  }

  viewProfile(member) {
    this.dialog.open({ title: member.first_name + ' ' + member.last_name,
                       style: { size: 'md', backdrop: 'static' },
                       bindings: { fields: [{ name: 'first_name', title: 'First Name', type: 'text', required: true },
                                            { name: 'last_name', title: 'Last Name', type: 'text', required: true },
                                            { name: 'email', title: 'Email', type: 'email', required: true },
                                            { name: 'birth_date', title: 'Birth Date', type: 'date', required: false },
                                            { name: 'username', title: 'Username', type: 'text', required: true },
                                            { name: 'password', title: 'Password', type: 'password', required: true },
                                           ],
                                   record: member },
                       submit: { title: 'Save',
                                 click: (record, next) => {
                                   console.log(record);
                                 }},
                       cancel: { title: 'Cancel', click: () => {}}
                     });
  }
}
