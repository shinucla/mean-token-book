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
    <h5 class="modal-title">
      <i class="far fa-check-square" *ngIf="config.style && config.style.isConfirm"></i>
      <i class="fas fa-exclamation-triangle" *ngIf="config.style && config.style.isWarning"></i>
      <i class="fas fa-info-circle" *ngIf="config.style && config.style.isInfo"></i>
      <i class="far fa-comment-dots" *ngIf="config.style && config.style.isMessage"></i>
       {{ config.title }}
    </h5>
    <a class="close" href (click)="onCancel(); false">
      <i class="far fa-times-circle"></i>
    </a>
  </div>
  <div class="modal-body">
    <ng-template #container></ng-template>
    <app-record-form [config]="recordForm"></app-record-form>
  </div>
`
})
export class FormFieldComponent implements OnInit, OnDestroy {
  /* config def:
   * { title: string,
   *   style: { size: string, backdrop: string, isWarning: boolean, isInfo: boolean, isConfirm, isMessage },
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
   *   submit: { title: string, click: (record, next) => { ... } },
   *   cancel?: { title: string, click: () => { ... } }
   * }
   *
   * definition of submit.click:
   *   record: returned form record,
   *   next: callback function: function(err?: Error) { ... }
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
      this.recordForm.submit.click = (record, next) => {
        submit(record,
               (error) => {
                 if (error) {
                   next(error);

                 } else {
                   this.activeModal.close();
                 }
               });
      };

      this.recordForm.cancel.click = () => {
        cancel();
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

  onCancel() {
    if (this.componentRef && this.componentRef.instance.onCancel) {
      this.componentRef.instance.onCancel();

    } else if (this.config.cancel){
      this.config.cancel.click();
    }

    this.activeModal.close();
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

  confirm(message, onOk, onCancel) {
    this.open({ title: 'Confirmation',
		style: { size: 'md', backdrop: 'static', isConfirm: true, showInput: false },
		bindings: { fields: [{ name: 'value', title: message, type: 'text' }]},
		submit: { title: 'Ok', click: (record, next) => onOk(next)},
		cancel: { title: 'Cancel', click: onCancel }
	      });
  }

  info(message) {
    this.open({ title: 'Information',
		style: { size: 'md', backdrop: 'static', isInfo: true, showInput: false },
		bindings: { fields: [{ name: 'value', title: message, type: 'text' }]},
		submit: { title: 'Ok', click: (record, next) => next()},
	      });
  }

  warn(message) {
    this.open({ title: 'Warning',
		style: { size: 'md', backdrop: 'static', isWarning: true, showInput: false },
		bindings: { fields: [{ name: 'value', title: message, type: 'text' }]},
		submit: { title: 'Ok', click: (record, next) => next()},
	      });
  }

  message(message) {
    this.open({ title: 'Message',
		style: { size: 'md', backdrop: 'static', isMessage: true, showInput: false },
		bindings: { fields: [{ name: 'value', title: message, type: 'text' }]},
		submit: { title: 'Ok', click: (record, next) => next()},
	      });
  }

  popup(config) {
    //TBI
  }

  editor(config) {
    //let compRef = this.ngbModal.open(DialogComponent, (config.style || { size: 'md', backdrop: 'static' }));
    //compRef.componentInstance.config = { title: config.title, component: content};
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
