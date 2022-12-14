import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-user-review-modal',
  templateUrl: './user-review-modal.component.html',
  styleUrls: ['./user-review-modal.component.scss']
})
export class UserReviewModalComponent implements OnInit {
  cardata: any = [];
  rating=4;
  UserReviewForm: FormGroup;
  isFormInvalid: boolean = false;
  public bsModalRef: BsModalRef;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private globalservice: GlobalService,
    public modalService: BsModalService) {
    this.UserReviewForm = fb.group({
      Title: ['', Validators.required],
      Review: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.cardata.push(JSON.parse(localStorage.getItem('Modaldata')));
    console.log("Modal data",this.cardata);
  // console.log("Modal data", this.cardata);
  }

  AddUserReview() {
    this.isFormInvalid = true;
    if (this.UserReviewForm.invalid) {
      return;
    }
    console.log("User Review is", this.UserReviewForm.value);
    let url = this.globalservice.base_path_api() + 'car-userreview/adduserreview';
    const body = {
      "user_title": this.UserReviewForm.value.Title,
      "user_review": this.UserReviewForm.value.Review
    }

    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      var reviews = rsp.data;
      // this.UserReviews = reviews;
      console.log(" User Review res", reviews);
      this.triggerEvent(reviews);
      this.modalService.hide();
      // localStorage.removeItem("Modaldata");
    })

    // this.closeModal.nativeElement.Click();
  }
  triggerEvent(item: string) {
    this.event.emit({ data: item, res: 200 });
  }

  close() {
    this.modalService.hide();
  }


}
