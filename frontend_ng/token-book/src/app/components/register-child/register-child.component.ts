import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.component.html',
  styleUrls: ['./register-child.component.scss']
})
export class RegisterChildComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(private formBuilder: FormBuilder,
	      private auth: AuthService,
	      private route: ActivatedRoute,
              private router: Router
	     ) { }

  // convenience getter for easy access to form fields
  get form() { return this.registerForm.controls; }
  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      username: [''],
      password: ['']
    });
    
  }

  onSubmit() {
    var user = { firstName: this.form.firstName.value,
		 lastName: this.form.lastName.value,
		 email: this.form.email.value,
		 username: this.form.username.value,
		 password: this.form.password.value };
    this.auth
      .registerChild(user)
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
