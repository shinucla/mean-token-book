import {
  Injectable,
  Input,
  OnInit,
  OnDestroy,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.scss']
})
export class RecordFormComponent implements OnInit, OnDestroy {
  /* config def:
   * { title: string,
   *   style: string,
   *   component?: Component,
   *   bindings?: { fields: [{ name: string,
   *                           title: string,
   *                           type: string,
   *                           required?: boolean,
   *                           values: [{...}] | Observale<[{...}]>,
   *                           displayKey: string,
   *                           valueKey: string
   *                         }, ...],
   *                record?: { name: value, ... }
   *              },
   *   submit: { title: '', click: (record, next) => { ... }},
   *   cancel?: () => { ... }
   * }
   */

  @Input() config: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>; // must implements IConfirm interface
  _form: FormGroup;
  submitted: boolean = false;
  alertMessage: string = null;

  constructor(private formBuilder: FormBuilder,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  public initCustomizedValidators() {
    Validators.trimableWithSpace = (control: FormControl) => {
      const v = control.value;
      return (!v || (typeof v !== 'string') || v.trim().length === v.length
	      ? null
	      : { 'trimable': true });
    };
  }
  
  ngOnInit() {
    this.initCustomizedValidators();
    
    let record = this.config.bindings.record;
    let group = {};
    for (let field of this.config.bindings.fields) {
      var value = record ? record[field.name] : null;
      var validators = [];

      if (field.required) validators.push(Validators.required, Validators.trimableWithSpace);
      if (field.min) validators.push(Validators.minLength(field.min));
      if (field.max) validators.push(Validators.maxLength(field.max));
      if ('email' === field.type.toLowerCase()) validators.push(Validators.email);

      group[field.name] = [ value, validators ];

      if (field.values instanceof Observable) {
        var dummy = {};
        dummy[field.displayKey] = null;
        dummy[field.valueKey] = '';

        field._values = field.values;
        field.values = [];
        field._values.subscribe(x => field.values = _.concat([dummy],x));
      }
    }

    this._form = this.formBuilder.group(group);
  }

  get form() { return this._form.controls; }

  ngOnDestroy() {

  }

  onSubmit() {
    this.submitted = true;
    this.alertMessage = null;

    if (this._form.invalid) {
      return;
    }

    this.config.submit.click(_/* record */
                             .chain(this.config.bindings.fields)
                             .keyBy('name')
                             .mapValues(x => this.form[x.name].value)
                             .value(),
			     
                             /* next callback */
                             (e) => { console.log(e);
			       if (!e) {
				 // NOP
			       } else if (e instanceof HttpErrorResponse) {
				 if (e.error.error && e.error.error.message) {
				   this.alertMessage = e.error.error.message;

				 } else {
				   this.alertMessage = e.error.error;
				 }
				 
			       } else if (e instanceof Error) {
				 this.alertMessage = e.message;
				 
			       } else if (e instanceof ErrorEvent) {
				 this.alertMessage = e.message;
				 
			       } else if (e.error && e.error.error) {
				 this.alertMessage = e.error.error;
				 
			       } else {
                                 this.alertMessage = 'There is error in the form';
			       }
                             });
  }

  onCancel() {
    if (this.config.cancel){
      this.config.cancel.click();
    }
  }
}
