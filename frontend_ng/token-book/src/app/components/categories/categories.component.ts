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
  fields = [{ name: 'id', visible: false, disabled: true },
	    { name: 'label',
              title: 'Label',
              type: 'text',
              required: true }
	   ];

  constructor(private dialog: DialogService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.categoryService.getCategories().subscribe(records => this.categories = records);
  }

  add() {
    this.dialog.open({ title: 'Add Category',
                       style: { size: 'sm', backdrop: 'static' },
                       bindings: { fields: this.fields },
                       submit: { title: 'Create',
                                 click: (record, next) => {
                                   this.categoryService.create(record).subscribe(x => {
                                     this.reload();
                                     next();
                                   }, err => next(err));
                                 }},
                       cancel: { title: 'Cancel',
                                 click: () => { /* NOP */ }}
                     });
  }

  edit(record) {
    this.dialog.open({ title: 'Edit Category',
                       style: { size: 'sm', backdrop: 'static' },
                       bindings: { fields: this.fields,
				   record: record },
                       submit: { title: 'Save',
                                 click: (record, next) => {
                                   this.categoryService.update(record).subscribe(x => {
                                     this.reload();
                                     next();
                                   }, err => next(err));
                                 }},
                       cancel: { title: 'Cancel',
                                 click: () => { /* NOP */ }}
                     });
  }

  delete(record) {
    this.dialog.confirm("Are you sure?",
                        (next) => {
                          this.categoryService.delete({ id: record.id }).subscribe(x => {
			    this.reload();
			    next();
			  });
			},
                        () => { /* nop */ });
  }
}
