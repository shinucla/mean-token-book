import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DialogService } from '../../services/dialog.service';
import { AddTokenEventComponent } from '../home/add-token-event.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[];

  constructor(private modalService: ModalService,
	      private dialogService: DialogService) { }

  ngOnInit() {
  }

  showDialog() {
    this.dialogService.open({ title: 'Add Category',
			      style: { size: 'lg', backdrop: 'static' },
			      component: AddTokenEventComponent,
			      bindings: { fields: [{ name: 'firstName', title: 'First Name', type: 'text' },
						   { name: 'lastName', title: 'Last Name', type: 'text' },
						   { name: 'gender', title: 'Gender', type: 'boolean' },
						   { name: 'age', title: 'Age', type: 'number' },
						   { name: 'username', title: 'User Name', type: 'text' },
						   { name: 'password', title: 'Password', type: 'password' }],
					  record: { firstName: 'Samuel', lastName: 'Zhuang', gender: 'Male', age: 8, username: 's', password:'a'},
					  onOk: (record, closeCallBack) => {
					    console.log(record);
					    closeCallBack();
					  }
					}
			    });
    //this.modalService.show("Hello", null, null, null);
  }
}
