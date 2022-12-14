import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../app/services/global.service';
//add toastr
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-confused',
  templateUrl: './confused.component.html',
  styleUrls: ['./confused.component.scss']
})
export class ConfusedComponent implements OnInit {

  inquiriesData:any;

  constructor(private http: HttpClient, private globalservice: GlobalService,public toastr: ToastrManager) { }

  ngOnInit(): void {
  }


  getInquiryForm=new FormGroup({
    name: new FormControl('',Validators.required),
    mobilenumber: new FormControl('',Validators.required),
  })


  onSubmitInquiry(){
    console.warn("here we get getFormValues",this.getInquiryForm.value); 
    const body={
      name:this.getInquiryForm.value.name,
      mobilenumber:this.getInquiryForm.value.mobilenumber
    }

    let url = this.globalservice.base_path_api() + 'inquiries/addInquiries';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      // console.log(" 1st added data in contactus form", rsp);
      this.inquiriesData = rsp;
      if(rsp){
        this.toastr.successToastr('Thanks for filling out our form!', 'Success!');
      }
      else{
        this.toastr.errorToastr('This is error.', 'Oops!');
      }
      console.log("this inquiriesData added",this.inquiriesData);
      
    })


    setTimeout(() => {
      console.log("set time out call ");
      location.reload();
      
    },3000);

    
  }





  

}
