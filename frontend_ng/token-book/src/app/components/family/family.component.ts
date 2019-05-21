import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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
  createFamilyForm: FormGroup;
  user: any;

  RoleEnum = RoleEnum;
  family = { title: '' };
  members = [];

  constructor(private userService: UserService,
	      private auth: AuthService,
	      private router: Router,
	      private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();

    if (this.user.family_id) {
      this.userService.getFamilyMembers().subscribe(data => {
	this.family = data['family'];
	this.members = data['members'];
      });

    } else {
      this.createFamilyForm = this.formBuilder.group({
	title: [''],
      });
    }
  }

  // convenience getter for easy access to form fields
  get form() { return this.createFamilyForm.controls; }

  navToRegisterFamilyMember() {
    this.router.navigate(['/registerFamilyMember']);
  }

  onSubmit() {
    var family = { title: this.form.title.value };
    this.userService
      .createFamily(family)
      .subscribe(f => {
	var newUser = this.user;
	newUser.family_id = f['id'];
	this.auth.updateUser(newUser);
	location.reload();
      });
  }
}
