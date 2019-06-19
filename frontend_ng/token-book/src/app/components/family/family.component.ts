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

    this.userService.getFamilyMembers().subscribe(data => {
      this.family = data['family'];
      this.members = data['members'];
    });
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
