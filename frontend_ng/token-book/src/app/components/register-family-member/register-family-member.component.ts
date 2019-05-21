import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

const roles = [{ id: 1, label: 'Parent' },
	       { id: 2, label: 'Child' },
	      ];

@Component({
  selector: 'app-register-family-member',
  templateUrl: './register-family-member.component.html',
  styleUrls: ['./register-family-member.component.scss']
})
export class RegisterFamilyMemberComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  roles = roles;

  constructor(private formBuilder: FormBuilder,
	      private auth: AuthService,
	      private route: ActivatedRoute,
              private router: Router
	     ) { }

  // convenience getter for easy access to form fields
  get form() { return this.registerForm.controls; }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.registerForm = this.formBuilder.group({
      role: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      username: [''],
      password: ['']
    });

  }

  onSubmit() {
    var user = { role: this.form.role.value,
		 firstName: this.form.firstName.value,
		 lastName: this.form.lastName.value,
		 email: this.form.email.value,
		 username: this.form.username.value,
		 password: this.form.password.value };
    this.auth
      .registerFamilyMember(user)
      .subscribe(data => {
	if (data && data.jwt) {
	  this.router.navigate(['/family']);
	}
      });
  }

  onCancel() {
    this.router.navigate(['/family']);
  }
}
