import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
	      private auth: AuthService,
	      private route: ActivatedRoute,
              private router: Router
	     ) {
    if (this.auth.getUserValue()) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get fields() { return this.form.controls; }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      username: [''],
      password: ['']
    });
  }

  navToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    var user = { firstName: this.fields.firstName.value,
		 lastName: this.fields.lastName.value,
		 email: this.fields.email.value,
		 username: this.fields.username.value,
		 password: this.fields.password.value };
    this.auth
      .register(user)
      .subscribe(data => {
	if (data && data.jwt) {
	  this.router.navigate(['/login']);
	}
      });
  }

}
