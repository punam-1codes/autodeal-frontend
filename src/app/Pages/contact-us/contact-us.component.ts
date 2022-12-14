import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../app/services/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
// import uniqueRandom from 'unique-random';
// import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUSComponent implements OnInit {

  //added variable
  addedData:any;
  securitycapchano:any;
  msg:any;

  // random:any = uniqueRandom(1000000, 9000000);
  // randomA:any=this.random()

  // randomString:any=Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
  newCapcha:any;
  

  constructor(private http: HttpClient, private globalservice: GlobalService,public toastr: ToastrManager) { }

  ngOnInit(): void {
    // this.randomCapcha()
    this.myFunction()
    this.creteNewCaptcha()
  }

  getForm=new FormGroup({
    fullname: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    subject: new FormControl('',Validators.required),
    securitycapcha: new FormControl('',Validators.required),
   
  })


  onSubmitCUS(){
    // this.http.post("http://localhost:8080/send",this.getForm.value).subscribe((data:any) => {
    //   console.log(data);
    //   this.msg=data
    // })
    // console.warn(this.getForm.value); 

    const body={
      fullname:this.getForm.value.fullname,
      mobile:this.getForm.value.mobile,
      email:this.getForm.value.email,
      subject:this.getForm.value.subject,
      
    }
    console.log("body values",body);
    

    let url = this.globalservice.base_path_api() + 'contact/add-contact';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log(" 1st added data in contactus form", rsp);
      this.addedData = rsp;
      console.log("this added",this.addedData);
      if(rsp){
        this.toastr.successToastr('Thanks for filling out our form!', 'Success!');
      }
      else{
        this.toastr.errorToastr('This is error.', 'Oops!');
      } 
    })


    setTimeout(() => {
      console.log("set time out call ");
      location.reload();
      
    },3000);

   


  }



  randomCapcha(){
    // console.log("THis capcha",this.randomA);
    // console.log("This string CAPCHA",this.newCapcha);
  }


  verifyCapcha(event: KeyboardEvent){
    var value = (<HTMLInputElement>event.target).value ;
    // console.log("value------->",value)
    // console.log("value------->",value.length)
  //   var nameLength=value.length + 1;
  //   console.log("min Number",nameLength);
  //   var vOTPValue=Number(value)
  //   var fourDigit=this.OTP
    // console.log("this value",value);
    // console.log("this randomA",this.newCapcha);
    
    
    if (value==this.newCapcha) {
      document.getElementById('subBtn').removeAttribute("disabled");
      this.msg="Valid Capcha, Click Submit button "
   } else{
      document.getElementById('subBtn').setAttribute("disabled", null);
      this.msg="Invalid Capcha"
   }
   }


   subjectValue(event: KeyboardEvent){
    var value = (<HTMLInputElement>event.target).value ;
    // console.log("value------->",value)
    // console.log("value------->",value.length)
    var x = document.getElementById("securityDiv");
    if (value) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

    // this.creteNewCaptcha()
    
   }




   //unhide button
   myFunction(){
    var x = document.getElementById("securityDiv");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }

   }

   creteNewCaptcha(){
     this.newCapcha=Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4);
    //  console.log("thi new one",this.newCapcha);
   }



  

}
