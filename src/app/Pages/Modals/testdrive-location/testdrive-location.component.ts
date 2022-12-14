import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-testdrive-location',
  templateUrl: './testdrive-location.component.html',
  styleUrls: ['./testdrive-location.component.scss']
})
export class TestdriveLocationComponent implements OnInit {
  public bsModalRef: BsModalRef;
  //get location using keyup
  locationKU: any;
  locationupdataKey: any;
  locationupdataLoc: any;
  locationPlace: any;

  //location button
  minNumber: any
  dLocation: any;
  constructor(public modalService: BsModalService,private globalservice: GlobalService,) { }

  ngOnInit(): void {
  }

  keyLocation(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;
    this.locationKU = value
    console.log("value------->", value)
    this.minNumber = value.length + 1;
    console.log("value of dlocation", this.dLocation);
    // console.log("boolean value is here",(this.minNumber>3 && this.dLocation));

    if (this.minNumber > 3) {
      // document.getElementById('locationDisable').removeAttribute("disabled");
      document.getElementById('locationDisable').removeAttribute("disabled");
    } else {
      document.getElementById('locationDisable').setAttribute("disabled", null);
    }

    console.log("here we store loaction", this.locationKU);



  }
  updateLocation(location:any){
    console.log("this location place",this.locationPlace);
    console.log("this location place location",location);

     console.log("get value from keyUP",this.locationKU);
     const body={
       location:this.locationKU,
      //  mobilenumber:this.getForm.value.mobilenumber
     }

     let url = this.globalservice.base_path_api() + 'user/locationdate';
     this.globalservice.PostRequest(url, body).subscribe(rsp => {
     // console.log(" 1st added data in contactus form", rsp);
     this.locationupdataKey = rsp;
     console.log("this added locationupdataKey without ifelse condition",this.locationupdataKey);
   })



    
  }


}
