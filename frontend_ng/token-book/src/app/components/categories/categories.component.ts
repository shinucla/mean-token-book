import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { DialogService } from '../../services/dialog.service';

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
			      bindings: { fields: [{ name: 'label', title: 'Label', type: 'text' },
						   { name: 'description', title: 'Description', type: 'text' }],
					},
			      onOk: (record, closeCallBack) => {
				console.log(record);
				closeCallBack();
			      }
			    });
    //this.modalService.show("Hello", null, null, null);
  }
}
