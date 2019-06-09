import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';

const RoleEnum = {
  PARENT: 1,
  CHILD: 2,
  ADMIN: 4,
};

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  user: any;
  records: any;
  recordForm: any;
  isParent: boolean = false;
  isAdmin: boolean = false;

  constructor(private auth: AuthService,
	      private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.user = this.auth.getUserValue();
    this.isParent = (this.user && 0 < (RoleEnum.PARENT & this.user.role_id)
		     ? true
		     : false);
    this.isAdmin = (this.user && 0 < (RoleEnum.ADMIN & this.user.role_id)
		    ? true
		    : false);
		     
    this.reload();
    this.recordForm = { bindings: { fields: [{ name: 'feedback', title: 'Message', type: 'text', required: true }] },
			submit: { title: 'Submit',
				  click: (record, next) => {
				    this.feedbackService.create(record).subscribe(
				      data => { next(); this.reload(); },
				      err => next(err)
				    );
				  }}
		      };
  }

  reload() {
    if (this.isParent && this.isAdmin) {
      this.feedbackService.getFeedbacksForAdmin().subscribe(records => this.records = records);

    } else if (this.isParent) {
      this.feedbackService.getFeedbacks().subscribe(records => this.records = records);
    }
  }

  deleteFeedback(id) {
    this.feedbackService.delete(id).subscribe(
      data => this.reload(),
      err => this.reload()
    );
  }
}
