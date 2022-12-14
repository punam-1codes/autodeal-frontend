import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-testdrive-dateandtime',
  templateUrl: './testdrive-dateandtime.component.html',
  styleUrls: ['./testdrive-dateandtime.component.scss']
})
export class TestdriveDateandtimeComponent implements OnInit {

  public bsModalRef: BsModalRef;
  //test drive date and time
  testdriveDate: any;
  timeslots: any =
    [{ time: '9:00 AM-11:00 AM', check: false }, { time: '11:00 AM-5:00 PM', check: false },
    { time: '1:00 PM-3:00 PM', check: false }, { time: '3:00 PM-5:00 PM', check: false }];
  testdriveTIme: any

  msgDateandTime: String = "Test drive now,or shedule for later";
  tdDateandTime: any;
  locationupdataKey: any;
  //Thanks You page
  scheduledPerson: any;
  scheduledTime: any;
  scheduledLocation: any;
  scheduledDate: any;
  constructor(private globalservice: GlobalService, public modalService: BsModalService) { }

  ngOnInit(): void {
  }

  getDateTime() {
    console.log("here we get data of testdrive", this.testdriveDate);
  }

  testDriveTime(value) {
    console.log("value testdrivevalue", value);
    this.testdriveTIme = value
    this.getDateTime()

    if (this.testdriveDate) {
      document.getElementById("dateown").setAttribute("disabled", null)
    }
    else {
      document.getElementById("dateown").removeAttribute("disabled");
    }

    if (this.testdriveDate && this.testdriveTIme) {
      document.getElementById("successtdBooking").removeAttribute("disabled");
    }
    else {
      document.getElementById("successtdBooking").setAttribute("disabled", null);
    }

    this.msgDateandTime = "Test drive date " + this.testdriveDate + " shedule time " + this.testdriveTIme
    // console.log("test drive date",this.testdriveDate,"test drive time",this.testdriveTIme);

  }

  successTestDrive() {
    // console.log("mobile number for perform update query",this.locationupdataKey.data.mobilenumber);
    // console.log("testdrive name",this.getForm.value.name);
    // console.log("location place",this.locationupdataKey.data.location);
    console.log("test drive date", this.testdriveDate, "test drive time", this.testdriveTIme);


    const body = {
      testdrivedate: this.testdriveDate,
      testdrivetime: this.testdriveTIme,
      mobilenumber: this.locationupdataKey.data.mobilenumber
    }

    let url = this.globalservice.base_path_api() + 'user/dateandtime';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      // console.log(" 1st added data in contactus form", rsp);
      this.tdDateandTime = rsp;
      console.log("this added testdriveDate and testdriveTIme", this.tdDateandTime);

      this.scheduledPerson = this.tdDateandTime.data.name.toUpperCase();
      this.scheduledLocation = this.tdDateandTime.data.location;
      this.scheduledTime = this.tdDateandTime.data.testdrivetime;
      this.scheduledDate = this.tdDateandTime.data.testdrivedate;
      console.log("Here we get all scheduled info", this.scheduledPerson, this.scheduledDate, this.scheduledTime, this.scheduledLocation);

    })


  }
}
