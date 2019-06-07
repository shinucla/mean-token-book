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
   *   submit: { title: '', click: (record, () => { onSuccessCallback(); }, () => { onErrorCallback(err); })
   *   cancel?: (closeCallBack) => { ... }
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

  ngOnInit() {
    let record = this.config.bindings.record;
    let group = {};
    for (let field of this.config.bindings.fields) {
      var value = record ? record[field.name] : null;
      var validators = [];

      if (field.required) validators.push(Validators.required);
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

    this.config.submit.click(/* record */_
        .chain(this.config.bindings.fields)
        .keyBy('name')
        .mapValues(x => this.form[x.name].value)
        .value(),
      /* onSuccessCallback */
      () => {
        // NOP;
      },
      /* onErrorCallback */
      (err) => {
        this.alertMessage = (err.error && err.error.error
                             ? err.error.error
                             : 'There is some error in the form');
      });
  }

  onCancel() {
    if (this.config.cancel){
      this.config.cancel.click();
    }
  }
}
