import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenEventService } from '../../services/token-event.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';

import { IConfirm } from '../../interfaces/IConfirm';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-token-event.component.html'
})
export class AddTokenEventComponent implements OnInit, IConfirm {
  form: FormGroup;
  children: any;
  categories: any;

  constructor(private formBuilder: FormBuilder,
	      private userService: UserService,
	      private categoryService: CategoryService,
	      private tokenService: TokenEventService) {}

  ngOnInit() {
    const sub1 = this.userService.getChildren().subscribe(data => {
      this.children = data;
      sub1.unsubscribe();
    });

    const sub2 = this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      sub2.unsubscribe();
    });

    this.form = this.formBuilder.group({
      child: [''],
      amount: [1],
      category: [''],
      description: ['']
    });
  }

  //@Override
  onOk() {
    let control = this.form.controls;
    const sub = (this.tokenService
		 .createTokenEvent({ userId: control.child.value,
				     amount: control.amount.value,
				     categoryId: control.category.value,
				     description: control.description.value })
		 .subscribe(data => {
		   sub.unsubscribe();
		   if (this['close']) {
		     this['close'](); // injected by modal.service
		   }
		 }));
    ;
  }

  //@Override
  onCancel() {
    console.log(this.form.controls);
  }
}
