import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;

  constructor(private dialogService: DialogService,
	      private categoryService: CategoryService) { }

  ngOnInit() {
    this.reload();
  }

  showDialog() {
    this.dialogService.open({ title: 'Add Category',
			      style: { size: 'sm', backdrop: 'static' },
			      bindings: { fields: [{ name: 'label', title: 'Label', type: 'text' },
						   { name: 'description', title: 'Description', type: 'text' }],
					},
			      onOk: (record, closeCallBack) => {
				this.categoryService.create(record).subscribe(x => {
				  this.reload();
				  closeCallBack();
				});
			      }
			    });
  }

  reload() {
    this.categoryService.getCategories().subscribe(records => this.categories = records);
  }
}
