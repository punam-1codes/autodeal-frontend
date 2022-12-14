import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { GlobalService } from '../../../services/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-get-test-drive',
  templateUrl: './get-test-drive.component.html',
  styleUrls: ['./get-test-drive.component.scss']
})
export class GetTestDriveComponent implements OnInit {
  // @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @Input() getdata: any;
  Userdata: any;
  loginwarn: boolean = false;
  TimeSlot: any = [];
  UPIPayment: any = [];
  gettimeduration: any;
  minDate = new Date();
  date = new FormControl();
  location = new FormControl();
  address = new FormControl();
  //google location by priyanka
  formattedaddress = " ";
  options = {
    componentRestrictions: {
      country: ["AU"]
    }
  }
  // end
  constructor(private globalservice: GlobalService, public toastr: ToastrManager) {
    this.Userdata = JSON.parse(localStorage.getItem("userdata"));
    if (this.Userdata == null) {
      this.loginwarn = true;
    } else {
      this.loginwarn = false;
    }
    // console.log("user details", this.Userdata, this.Userdata.name, this.Userdata.mobilenumber);
  }
  ngOnInit(): void {

    this.UPIPayment = [
      { img: 'assets/Images/card.PNG', title: 'Card', subtitle: 'Visa,Mastercard,RuPay and Maestro' },
      { img: 'assets/Images/NetBanking.PNG', title: 'Netbanking', subtitle: 'All Indian Bank' },
      { img: 'assets/Images/Wallet.PNG', title: 'Wallet', subtitle: 'Phonepe & More' },
      { img: 'assets/Images/PayLater.PNG', title: 'Paylater', subtitle: 'ICICI' },
    ]

    this.TimeSlot = [
      { time: '9:00 AM-11:00 AM', check: false }, { time: '11:00 AM-5:00 PM', check: false },
      { time: '1:00 PM-3:00 PM', check: false }, { time: '3:00 PM-5:00 PM', check: false }
    ]
  }

  gettime(time) {
    this.gettimeduration = time.time
    console.log("Time is...", this.gettimeduration);

    for (let i = 0; i < this.TimeSlot.length; i++) {
      if (time === i) {
        this.TimeSlot[i].check = true
      } else {
        this.TimeSlot[i].check = false
      }
    }

  }

  getlocation() {
    console.log("location and address is..", this.location.value, this.address.value);
    this.location.disable();
    this.address.disable();
  }

  changeAddress() {
    console.log("change address is called......");
    this.location.enable();
    this.address.enable();
  }

  getdatetime() {
    console.log("date and time is..", this.date.value, this.gettimeduration);
    let url = this.globalservice.base_path_api() + 'sellcarbtd/addsellcarbtd';
    const body = {
      "scbtd_location": this.location.value,
      "scbtd_address": this.address.value,
      "scbtd_date": this.date.value,
      "scbtd_time": this.gettimeduration,
      "scbtd_username": this.Userdata.name,
      "scbtd_mobile": this.Userdata.mobilenumber,
      "scbtd_car_id": this.getdata.sell_car_id
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      var data = rsp.data;
      console.log(" test drive res", data);
      this.toastr.successToastr('Successfully done Test Drive Process!');
    })

  }

  // public AddressChange(address: any) {
  //   //setting address from API to local variable
  //   this.formattedaddress = address.formatted_address
  //   console.log("address is ", this.formattedaddress);
  // }

}
