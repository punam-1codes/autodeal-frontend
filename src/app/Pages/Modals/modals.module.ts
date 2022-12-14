import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReviewModalComponent } from './user-review-modal/user-review-modal.component';
import { TestdriveComponent } from './testdrive/testdrive.component';
import { TestdriveOtpverificationComponent } from './testdrive-otpverification/testdrive-otpverification.component';
import { TestdriveBringcarComponent } from './testdrive-bringcar/testdrive-bringcar.component';
import { TestdriveLocationComponent } from './testdrive-location/testdrive-location.component';
import { TestdriveDateandtimeComponent } from './testdrive-dateandtime/testdrive-dateandtime.component';
import { TestdriveThankyouschedudleComponent } from './testdrive-thankyouschedudle/testdrive-thankyouschedudle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TestdriveComponent, TestdriveOtpverificationComponent, 
    TestdriveBringcarComponent, TestdriveLocationComponent, TestdriveDateandtimeComponent,
     TestdriveThankyouschedudleComponent,UserReviewModalComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,NgbModule,
  ]
})
export class ModalsModule { }
