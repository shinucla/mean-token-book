import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  returnUrl: string;
  recordForm: any;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router
             ) {
    if (this.auth.getUserValue()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.recordForm = { title: 'Sign up',
                        bindings: { fields: [{ name: 'firstName', title: 'First Name', type: 'text', required: true },
                                             { name: 'lastName', title: 'Last Name', type: 'text', required: true },
                                             { name: 'email', title: 'Email', type: 'email', required: true },
                                             { name: 'username', title: 'Username', type: 'text', required: true },
                                             { name: 'password', title: 'Password', type: 'password', required: true }]
                                  },
                        submit: { title: 'Sign up',
				  type: 'button',
				  click: (record, next) => {
				    this.auth
				      .register(record)
				      .subscribe(data => {
					if (data && data.jwt) {
					  this.router.navigate(['/login']);
					  next();
					  
					} else {
					  next(new Error('Please try again later'));
					}
				      }, err => next(err));
				  }},
                        cancel: { title: 'Cancel',
				  type: 'link',
				  click: () => {
				    this.router.navigate([this.returnUrl || '/login']);
				  }}
                      };
  }
}
