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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import * as _ from 'lodash';

// ================================================================

@Component({
  template: `
  <div class="modal-header">
    <h3 class="modal-title">{{ config.title }}</h3>
    <a class="close" href (click)="onCancel(); false">
      <i class="far fa-times-circle"></i>
    </a>
  </div>
  <div class="modal-body">
    <!-- Alert Message -->
    <ngb-alert type="danger" [dismissible]="false" *ngIf="alertMessage">
      {{ alertMessage }}
    </ngb-alert>
    <ng-template #container></ng-template>
    <form *ngIf="!config.component" [formGroup]="_form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <div *ngFor="let field of config.bindings.fields">
          <label for="{{ field.name }}">{{ field.title }}</label>
          <input *ngIf="!field.values"
                 type="{{ field.type }}"
                 formControlName="{{ field.name }}"
                 class="form-control"
                 [ngClass]="{ 'is-invalid': submitted && form[field.name].errors }" />
          <select *ngIf="field.values"
                  class="form-control"
                  formControlName="{{ field.name }}"
                  [ngClass]="{ 'is-invalid': submitted && form[field.name].errors }">
            <option *ngFor="let c of field.values" [value]="c[field.valueKey]">
	      {{ c[field.displayKey] }}
            </option>
          </select>
          <!-- Error Message -->
          <div *ngIf="submitted && form[field.name].errors" class="invalid-feedback">
            <div *ngIf="form[field.name].errors.required">required</div>
          </div>
        </div>
      </div>
   </form>
  </div>
  <div class="modal-body text-right">
    <button type="button" class="btn btn-outline-dark" (click)="onSubmit()">OK</button>
    <button type="button" class="btn btn-outline-dark" (click)="onCancel()">Cancel</button>
  </div>
`
})
export class FormFieldComponent implements OnInit, OnDestroy {
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
   *   onSubmit: (record, () => { onSuccessCallback(); }, () => { onErrorCallback(err); })
   *   onCancel?: (closeCallBack) => { ... }
   * }
   */
  @Input() config: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  componentRef: ComponentRef<any>; // must implements IConfirm interface
  _form: FormGroup;
  submitted: boolean = false;
  alertMessage: string = null;

  constructor(private formBuilder: FormBuilder,
	      private activeModal: NgbActiveModal,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.config.component) {
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

    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.component);
      this.componentRef = this.container.createComponent(componentFactory);
      this.componentRef.instance.close = () => this.activeModal.close('close');
    }
  }

  get form() { return this._form.controls; }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.alertMessage = null;

    if (this._form.invalid) {
      return;
    }

    if (this.componentRef) {
      this.componentRef.instance.onSubmit();

    } else {
      this.config.onSubmit(/* record */_
			   .chain(this.config.bindings.fields)
			   .keyBy('name')
			   .mapValues(x => this.form[x.name].value)
			   .value(),
			   /* onSuccessCallback */
			   () => {
			     this.activeModal.close();
			   },
			   /* onErrorCallback */
			   (err) => {
			     this.alertMessage = (err.error && err.error.error
						  ? err.error.error
						  : 'There is some error in the form');
			   });
    }
  }

  onCancel() {
    if (this.componentRef && this.componentRef.instance.onCancel) {
      this.componentRef.instance.onCancel();

    } else if (this.config.onCancel){
      this.config.onCancel(this.activeModal.close);

    } else {
      this.activeModal.close();
    }
  }
}

// ================================================================

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private ngbModal: NgbModal) { }

  open(config) {
    let compRef = this.ngbModal.open(FormFieldComponent, (config.style || { size: 'md', backdrop: 'static' }));
    compRef.componentInstance.config = config;
  }

  popup(config) {
    //TBI
  }

  editor(config) {
    //let compRef = this.ngbModal.open(DialogComponent, (config.style || { size: 'md', backdrop: 'static' }));
    //compRef.componentInstance.config = { title: config.title, component: content};
  }

  warn(config) {
    // TBI
  }

  confirm(config) {
    // TBI
  }

  info(config) {
    // TBI
  }

  message(config) {
    // TBI
  }
}




/*
 * Future modal service should go for following style:
 *
 * addImageAds: function(scope, records) {
 *   return (RipDialog.editor({ title: i18n('Add Image Ads'),
 *                              windowStyleName: 'rip-dialog-editor-xlarge',
 *                              directive: 'ripLocationEditorImageAdsEditor',
 *                              bindings: { records: [],
 *                                          canAddRemoveImageFiles: true }
 *                                        })
 *                    .result(function(ads) {
 *                       recordForSave(_.union(records, ads), scope.location);
 *                       return scope.updateLocation(scope.location);
 *                     }));
 * },
 *
*/
