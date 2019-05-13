import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
  get form() { return this.loginForm.controls; }
  
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    
  }

  onSubmit() {
    var user = { username: this.form.username.value,
		 password: this.form.password.value };
    this.auth
      .login(user)
      .subscribe(u => {
	if (u && u.jwt) {
	  console.log('logged in');
	  this.router.navigate([this.returnUrl]);
	  location.reload();
	}
      });
  }

}
