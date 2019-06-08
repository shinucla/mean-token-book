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
  recordForm: any;
  returnUrl: string;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router
             ) {
    if (this.auth.getUserValue()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.recordForm = { title: 'Sign in',
                        style: { size: 'lg', backdrop: 'static' },
                        bindings: { fields: [{ name: 'username', title: 'Username', type: 'text', required: true },
                                             { name: 'password', title: 'Password', type: 'password', required: true }],
                                  },
                        submit: { title: 'Sign in',
                                  click: (record, next) => {
                                    this.auth
                                      .login(record)
                                      .subscribe(u => {
                                        if (u && u.jwt) {
                                          //this.router.navigate(['/']);
                                          location.reload();
					  next();
					  
                                        } else {
					  next(new Error('Please try again later'));
					}
                                      }, err => next(err));
                                  }},
                        cancel: { title: 'Sign up',
                                  click: () => {
                                    this.router.navigate(['/register'], { queryParams: { returnUrl: '/login' }});
                                  }}
                      };
  }
}
