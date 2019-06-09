import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  records: any;
  recordForm: any;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
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
    this.feedbackService.getFeedbacks().subscribe(records => this.records = records);
  }

  deleteFeedback(id) {
    this.feedbackService.delete(id).subscribe(
      data => this.reload(),
      err => this.reload()
    );
  }
}
