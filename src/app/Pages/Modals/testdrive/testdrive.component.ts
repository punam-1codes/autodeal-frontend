import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-testdrive',
  templateUrl: './testdrive.component.html',
  styleUrls: ['./testdrive.component.scss']
})
export class TestdriveComponent implements OnInit {
  TestdriveForm: FormGroup;
  isFormInvalid: boolean = false;
  TestdriveFormno:any;
  mobilenumber:any;
  addedDataCD:any;
  otpBE:any;
  cardata:any=[];

  public bsModalRef: BsModalRef;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private globalservice: GlobalService,
    public modalService: BsModalService,private http: HttpClient) {
    this.TestdriveForm = fb.group({
      name: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.cardata.push(JSON.parse(localStorage.getItem('Modaldata')));
    console.log("Modal data",this.cardata);
  }

  onSubmit(){
    this.isFormInvalid = true;
    if (this.TestdriveForm.invalid) {
      return;
    }
    this.TestdriveFormno=this.TestdriveForm.value.mobilenumber
    console.log("TestdriveFormno",this.TestdriveFormno);

    console.log("get form data",this.TestdriveForm);

    console.log("otpCall template2",this.TestdriveForm.value.mobilenumber);
         if (this.TestdriveForm.value.mobilenumber) {
     //    this.openModal(template2)
      //  this.displayno=template2;
         console.log("true");
        //  this.msg="OTP has been sent successfully";
         this.sendOTP(this.TestdriveForm.value.mobilenumber)
       } else {
         console.log("wrong number");
       }

    const body={
      name:this.TestdriveForm.value.name,
      mobilenumber:this.TestdriveForm.value.mobilenumber,
      email:this.TestdriveForm.value.email,
      // subject:this.TestdriveForm.value.subject,
      
    }
    console.log("form mobile number",this.TestdriveForm.value.mobilenumber);
    this.mobilenumber=this.TestdriveForm.value.mobilenumber
    console.log("mobile number",this.mobilenumber);
    
    let url = this.globalservice.base_path_api() + 'user/updatedata';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      // console.log(" 1st added data in contactus form", rsp);
      this.addedDataCD = rsp;
      console.log("this added",this.addedDataCD);
    })
  
  }
  sendOTP(template2:any) {
    console.log("vishal 1",template2);
    
    const body = {
      mobilenumber: template2
    };
    // let url = this.base_path_service.base_path_api() + 'user/loginViaPhone';
    // let url = 'https://fchapi.familycarehospitals.com/api/v1/user/loginViaPhone';
    let url = this.globalservice.base_path_api() + 'user/loginapi';
    // let url = 'http://localhost:3000/api/v1/user/loginapi';

    setTimeout(()=>{
      console.log("set time out call after 5000 sec");

      this.http.post<any>(url, body).subscribe(rsp => {
        console.log("data vishal sendOTPs function", rsp);
        console.log(" sendOTPs function ----->",rsp.data.otp)
        this.otpBE=rsp.data.otp
  
        // if (rsp.success == true) {
        //   this.username=rsp.data.name;
        //   this.userdata=rsp.data;
        //   console.log("sendOTP this userdata",this.userdata);
          
        //   console.log("name of usser in login",this.username);
        //   this.userflagname=true;
        //   this.OTP = rsp.data.otp;
        //   this.otpflg=true;
        //   // this.otptime = rsp.data.otptime
  
  
  
        //   // console.log({
  
        //   //   'this.OTP': this.OTP,
        //   //   ' this.otptime': this.otptime
        //   // });
  
        // }
        // else{
        //   this.msg="Please register with your mobile number to get started";
        //   this.registerno=this.displayno;
        //   this.registerflag=true;
        //   event.preventDefault(); 
  
        //   console.log("non login else part call");
          
        //   setTimeout(() => {
        //     console.log("Delayed for 2 second.");
        //     this.loginuserflag=false;
        //   },50000)
        //   // this.loginuserflag=false;
        // }
  
      })
    },5000)

    
  }
}
