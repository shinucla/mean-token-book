import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  recordForm: any;
  returnUrl: string;

  roles = roles;

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router
             ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    this.recordForm = { title: 'Register a family member',
                        style: { size: 'lg', backdrop: 'static' },
                        bindings: { fields: [{ name: 'role',
                                               title: 'Role',
                                               type: 'number',
                                               required: true,
                                               values: this.roles,
                                               displayKey: 'label',
                                               valueKey: 'id' },
                                             { name: 'firstName',
                                               title: 'First Name',
                                               type: 'text',
                                               required: true },
                                             { name: 'lastName',
                                               title: 'Last Name',
                                               type: 'text',
                                               required: true },
                                             { name: 'email',
                                               title: 'Email',
                                               type: 'email',
                                               required: true },
                                             { name: 'username',
                                               title: 'Username',
                                               type: 'text',
                                               required: true },
                                             { name: 'password',
                                               title: 'Password',
                                               type: 'password',
                                               required: true }],
                                    record: { role: 2 }
                                  },
                        submit: { title: 'Register',
                                  click: (record, onSuccessCallback, onErrorCallback) => {
                                    this.auth
                                      .registerFamilyMember(record)
                                      .subscribe(data => {
                                        if (data && data.jwt) {
                                          this.router.navigate(['/family']);
                                        }
                                        onSuccessCallback();
                                      }, err => onErrorCallback(err));
                                  }},
                        cancel: { title: 'Cancel',
                                  click: () => {
                                    this.router.navigate(['/family']);
                                  }}
                      };
  }
}
