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
    <ng-template #container></ng-template>
    <app-record-form [config]="recordForm"></app-record-form>
  </div>
  <!--div class="modal-body text-right">
    <button type="button" class="btn btn-outline-dark" (click)="onSubmit()">OK</button>
    <button type="button" class="btn btn-outline-dark" (click)="onCancel()">Cancel</button>
  </div-->
`
})
export class FormField2Component implements OnInit, OnDestroy {
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
  recordForm: any;

  constructor(private activeModal: NgbActiveModal,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    if (!this.config.component) {
      var submit = this.config.submit.click;
      var cancel = this.config.cancel.click;
      this.recordForm = this.config;
      this.recordForm.submit.click = (record, onSuccess, onError) => {
	submit(record,
	       () => {
		 onSuccess();
		 this.activeModal.close();
	       },
	       onError);
      };
      this.recordForm.cancel.click = () => {
	this.activeModal.close();
      };

    } else {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.component);
      this.componentRef = this.container.createComponent(componentFactory);
      this.componentRef.instance.close = () => this.activeModal.close('close');
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

 //onSubmit() {
 //  this.submitted = true;
 //  this.alertMessage = null;
 //
 //  if (this._form.invalid) {
 //    return;
 //  }
 //
 //  if (this.componentRef) {
 //    this.componentRef.instance.onSubmit();
 //
 //  } else {
 //    this.config.onSubmit(/* record */_
 //			   .chain(this.config.bindings.fields)
 //			   .keyBy('name')
 //			   .mapValues(x => this.form[x.name].value)
 //			   .value(),
 //			   /* onSuccessCallback */
 //			   () => {
 //			     this.activeModal.close();
 //			   },
 //			   /* onErrorCallback */
 //			   (err) => {
 //			     this.alertMessage = (err.error && err.error.error
 //						  ? err.error.error
 //						  : 'There is some error in the form');
 //			   });
 //  }
 //}
 //
 //onCancel() {
 //  if (this.componentRef && this.componentRef.instance.onCancel) {
 //    this.componentRef.instance.onCancel();
 //
 //  } else if (this.config.onCancel){
 //    this.config.onCancel(this.activeModal.close);
 //
 //  } else {
 //    this.activeModal.close();
 //  }
 //}
}

// ================================================================

@Injectable({
  providedIn: 'root',
})
export class Dialog2Service {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private ngbModal: NgbModal) { }

  open(config) {
    let compRef = this.ngbModal.open(FormField2Component, (config.style || { size: 'md', backdrop: 'static' }));
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
