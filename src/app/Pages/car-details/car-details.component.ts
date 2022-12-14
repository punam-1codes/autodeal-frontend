import { Component, OnInit, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../app/services/global.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TestdriveComponent } from '../Modals/testdrive/testdrive.component';
import { TestdriveBringcarComponent } from '../Modals/testdrive-bringcar/testdrive-bringcar.component';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import { SwiperComponent } from "swiper/angular";
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  public bsModalRef: BsModalRef;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  car_review: 5;
  slideConfig: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 100,
    effect: "fade",
    loop: true,
    lazy: {
      loadPrevNext: true,
    },
    zoom: {
      maxRatio: 5,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: true,
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 4,
      }
    }

  };
  rating = 4;
  lat = 19.2138786;
  lng = 72.9314198;
  KeySpecs: any = [];
  carnews: any = [];
  Pricelist: any = [];
  Carcolors: any = [];
  cars: any = [];
  cardata: any = [];
  colors: any = [];
  loader: boolean = false;
  Allvrients: any = [];
  PetrolVersion: any = [];
  DieselVersion: any = [];
  AutomaticVersion: any = [];
  //varibale decalireation
  userinfodecryptCD: any;
  getuserdatadecryptCD = [];
  name: any;
  mobilenumber: any;
  email: any;
  dLocation: any;
  getformno: any;


  addedDataCD: any;

  //otp varibales
  otpBE: any;
  otpnoCD: any;

  //get location using keyup
  locationKU: any;
  locationupdataKey: any;
  locationupdataLoc: any;
  locationPlace: any;

  //location button
  minNumber: any


  //test drive date and time
  testdriveDate: any;
  timeslots: any = [{ time: "9:00AM - 11:00PM" }, { time: "12:00PM - 2:00PM" }, { time: "3:00PM - 5:00PM" }, { time: "7:00PM - 9:00PM" }]
  testdriveTIme: any

  msgDateandTime: String = "Test drive now,or shedule for later";
  tdDateandTime: any;

  //Thanks You page
  scheduledPerson: any;
  scheduledTime: any;
  scheduledLocation: any;
  scheduledDate: any;


  //again get local storage
  userinfodecryptCDLS: any;
  getuserdatadecryptCDLS = [];

  //here we set new local storage
  userDataCD = [];
  userinfoencryptPush: any;
  userinfodecryptGET: any;
  getuserdatadecryptConsole: any;

  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, public modalService: BsModalService) { }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '..........' :
      string;
  }

  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  selectedTab = 0;
  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  ngOnInit(): void {
    this.loader = true;
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardata = JSON.parse(params['data']);
        console.log("Car data is", this.cardata);
        this.cardata.forEach(cardata => {
          this.cardata.mileage_print = cardata.mileage_print;
          this.cardata.engine = cardata.engine;
          this.cardata.transmission = cardata.transmission;
          this.cardata.capacities_seating_capacity = cardata.capacities_seating_capacity;
          this.cardata.model = cardata.model;
          this.cardata.brand = cardata.brand;
          cardata.colors.forEach(color => {
            this.colors.push(color);
          })
        });
      });
    this.getallvarients();
    this.getBrands();
    this.KeySpecs = [
      { icon: 'fas fa-tachometer-alt', head: 'Mileage (upto)', data: this.cardata.mileage_print },
      { icon: 'fas fa-motorcycle', head: 'Engine (upto)', data: this.cardata.engine },
      { icon: 'fas fa-bolt', head: 'BHP', data: this.cardata.BHP },
      { icon: 'fas fa-car', head: 'Transmission', data: this.cardata.transmission },
      { icon: 'fas fa-chair', head: 'seats', data: this.cardata.capacities_seating_capacity },
      { icon: 'fas fa-clipboard', head: 'Service Cost', data: this.cardata.cost },
    ]

    localStorage.removeItem("userinfoCD");
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userinfo') != null) {
        //login info decryption
        var encryptSecretKey = "aaaaa";
        var getlocaldata = localStorage.getItem("userinfo")


        this.userinfodecryptCD = CryptoJS.AES.decrypt(getlocaldata, encryptSecretKey);
        this.getuserdatadecryptCD = JSON.parse(this.userinfodecryptCD.toString(CryptoJS.enc.Utf8));

        this.getForm.setValue({
          "name": this.getuserdatadecryptCD["name"],
          "mobilenumber": this.getuserdatadecryptCD["mobilenumber"],
          "email": this.getuserdatadecryptCD["email"],

        })



        console.log("userinfodecrypt data CD", this.getuserdatadecryptCD);
        this.name = this.getuserdatadecryptCD["name"]
        this.email = this.getuserdatadecryptCD["email"]
        this.mobilenumber = this.getuserdatadecryptCD["mobilenumber"]
        //one old bind of location
        // this.dLocation=this.getuserdatadecryptCD["location"]
        console.log("here bind data", this.name, this.email, this.mobilenumber);


        //this.username=this.getuserdatadecrypt;
        console.log("this.getuserdatadecrypt CD", this.getuserdatadecryptCD)
        console.log("this.getuserdatadecrypt CD", this.getuserdatadecryptCD["name"]);
        // this.username=this.getuserdatadecrypt["name"];
        // this.userflagname=true;

      } else {
        console.log("user not login ")
        // this.userflagname=false;
      }
    }
  }



  getForm = new FormGroup({
    name: new FormControl('', Validators.required),
    mobilenumber: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })






  onSubmit() {

    this.getformno = this.getForm.value.mobilenumber
    console.log("getformno", this.getformno);

    console.log("get form data", this.getForm);

    console.log("otpCall template2", this.getForm.value.mobilenumber);
    if (this.getForm.value.mobilenumber) {
      //    this.openModal(template2)
      //  this.displayno=template2;
      console.log("true");
      //  this.msg="OTP has been sent successfully";
      this.sendOTP(this.getForm.value.mobilenumber)
    } else {
      console.log("wrong number");
    }

    const body = {
      name: this.getForm.value.name,
      mobilenumber: this.getForm.value.mobilenumber,
      email: this.getForm.value.email,
      // subject:this.getForm.value.subject,

    }
    console.log("form mobile number", this.getForm.value.mobilenumber);
    this.mobilenumber = this.getForm.value.mobilenumber
    console.log("mobile number", this.mobilenumber);

    let url = this.globalservice.base_path_api() + 'user/updatedata';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      // console.log(" 1st added data in contactus form", rsp);
      this.addedDataCD = rsp;
      console.log("this added", this.addedDataCD);
    })

  }





  sendOTP(template2: any) {
    console.log("vishal 1", template2);

    const body = {
      mobilenumber: template2
    };
    // let url = this.base_path_service.base_path_api() + 'user/loginViaPhone';
    // let url = 'https://fchapi.familycarehospitals.com/api/v1/user/loginViaPhone';
    let url = this.globalservice.base_path_api() + 'user/loginapi';
    // let url = 'http://localhost:3000/api/v1/user/loginapi';

    setTimeout(() => {
      console.log("set time out call after 5000 sec");

      this.http.post<any>(url, body).subscribe(rsp => {
        console.log("data vishal sendOTPs function", rsp);
        console.log(" sendOTPs function ----->", rsp.data.otp)
        this.otpBE = rsp.data.otp

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
    }, 5000)


  }

  getBrands() {
    console.log(this.cardata.brand);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + this.cardata.brand;
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.cars = rsp.data;
      console.log("brand data", this.cars);
    })
  }

  getallvarients() {
    let url = this.globalservice.base_path_api() + 'cars/getallvarients';
    const body = {
      model: this.cardata.model
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      this.loader = false;
      var varientdata = rsp.data;
      this.Allvrients = varientdata;
      console.log(" varients array res", this.Allvrients);
      this.PetrolVersion = this.Allvrients.filter(v => v.fuel_type == 'Petrol');
      console.log("petrol version", this.PetrolVersion);
      this.DieselVersion = this.Allvrients.filter(v => v.fuel_type == 'Diesel');
      console.log("Diesel version", this.DieselVersion);
      this.AutomaticVersion = this.Allvrients.filter(v => v.transmission == 'Automatic');
      console.log("Automatic version", this.AutomaticVersion);
    })

  }



  verifyOTPCD(event: KeyboardEvent) {
    var value = (<HTMLInputElement>event.target).value;
    console.log("value------->", value)
    console.log("value------->", value.length)
    var nameLength = value.length + 1;
    console.log("min Number", nameLength);
    var vOTPValue = Number(value)
    var fourDigit = this.otpBE

    if (vOTPValue == fourDigit) {
      document.getElementById('votpCD').removeAttribute("disabled");
      // this.msg="Valid OTP , Click Verify OTP button "
    } else {
      document.getElementById('votpCD').setAttribute("disabled", null);
      // this.msg="Invalid OTP"
    }
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


  //here we add consition if user have location already in database then enable button if not so disable button
  locationSign() {
    if (this.dLocation) {
      document.getElementById('locationDisable').removeAttribute("disabled");
    }
    else {
      document.getElementById('locationDisable').setAttribute("disabled", null);
    }
  }




  updateLocation(location: any) {
    console.log("this location place", this.locationPlace);
    console.log("this location place location", location);

    console.log("get value from keyUP", this.locationKU);
    const body = {
      location: this.locationKU,
      mobilenumber: this.getForm.value.mobilenumber
    }

    let url = this.globalservice.base_path_api() + 'user/locationdate';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      // console.log(" 1st added data in contactus form", rsp);
      this.locationupdataKey = rsp;
      console.log("this added locationupdataKey without ifelse condition", this.locationupdataKey);
    })



    //  if(location==undefined){
    //   //  console.log("get value from keyUP",this.locationKU);
    //   const body={
    //     location:this.locationKU,
    //     mobilenumber:this.getForm.value.mobilenumber
    //   }

    //   let url = this.globalservice.base_path_api() + 'user/locationdate';
    //   this.globalservice.PostRequest(url, body).subscribe(rsp => {
    //   // console.log(" 1st added data in contactus form", rsp);
    //   this.locationupdataKey = rsp;
    //   console.log("this added locationupdataKey",this.locationupdataKey);
    // })

    //  }else{


    //   //  console.log("get value from local storage",location);
    //   const body={
    //     location:location,
    //     mobilenumber:this.getForm.value.mobilenumber
    //   }

    //   let url = this.globalservice.base_path_api() + 'user/locationdate';
    //   this.globalservice.PostRequest(url, body).subscribe(rsp => {
    //   // console.log(" 1st added data in contactus form", rsp);
    //   this.locationupdataLoc = rsp;
    //   console.log("this added locationupdataLoc",this.locationupdataLoc);
    // })      
    //  }

    // if(location){
    //   const body={
    //         location:location,
    //         mobilenumber:this.getForm.value.mobilenumber
    //       }

    //       let url = this.globalservice.base_path_api() + 'user/locationdate';
    //       this.globalservice.PostRequest(url, body).subscribe(rsp => {
    //       // console.log(" 1st added data in contactus form", rsp);
    //       this.locationupdataLoc = rsp;
    //       console.log("this added locationupdataLoc and Enter value",this.locationupdataLoc);
    //     })
    // }else{
    //   console.log("user not enter location");

    // }

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

    if (this.testdriveDate && this.testDriveTime) {
      document.getElementById("successtdBooking").removeAttribute("disabled");
    }
    else {
      document.getElementById("successtdBooking").setAttribute("disabled", null);
    }

    this.msgDateandTime = "Test drive date " + this.testdriveDate + " shedule time " + this.testdriveTIme
    // console.log("test drive date",this.testdriveDate,"test drive time",this.testdriveTIme);

  }

  GetTestDrive(cardata) {
    this.bsModalRef = this.modalService.show(TestdriveBringcarComponent, {
      animated: true,
      // initialState: this.cardata,
      backdrop: 'static',
      class: 'modal-lg',
    });
    localStorage.setItem('Modaldata', JSON.stringify(cardata));
  }

  successTestDrive() {
    console.log("mobile number for perform update query", this.locationupdataKey.data.mobilenumber);
    console.log("testdrive name", this.getForm.value.name);
    console.log("location place", this.locationupdataKey.data.location);
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






  vandpCall() {
    console.log("verification and prodeed call");
    //here we remove old local storage 1st
    localStorage.removeItem("userinfo");

    const body = {
      mobilenumber: this.getForm.value.mobilenumber
    };

    let url = this.globalservice.base_path_api() + 'user/nouserdata';

    // let url = 'http://localhost:3000/api/v1/user/nouserdata';

    this.http.post<any>(url, body).subscribe(rsp => {
      console.log("data vishal sendOTPs function", rsp);
      this.userDataCD = rsp.data
      console.log("this.userDataCD --here we get data or not", this.userDataCD);
      //here we get data by id -> after this we want to store this data in localstorage
      var encryptSecretKey = "aaaaa";
      this.userinfoencryptPush = CryptoJS.AES.encrypt(JSON.stringify(this.userDataCD), encryptSecretKey).toString();
      //here we set local storage in one variable (userinfoCD)
      localStorage.setItem("userinfoCD", this.userinfoencryptPush);
      //here we get userinfoCD in application tab in crome
      //here we start decrypt process of encrypt data
      var getlocaldata = localStorage.getItem("userinfoCD")
      this.userinfodecryptGET = CryptoJS.AES.decrypt(getlocaldata, encryptSecretKey);
      this.getuserdatadecryptConsole = JSON.parse(this.userinfodecryptGET.toString(CryptoJS.enc.Utf8));
      //here we get decrypt data in console 
      console.log("getuserdatadecryptConsole data CD --------->", this.getuserdatadecryptConsole[0]);
      //here we change all data
      this.dLocation = this.getuserdatadecryptConsole[0].location
      console.log("here we get dLocation real value", this.dLocation);

    })

  }


































}

// brand: "Datsun"
// car_id: "d5ANj3"
// createdAt: "2022-05-30T05:57:11.345Z"
// engine: "1198 cc"
// fuel_type: "Petrol"
// mileage: 19
// mileage_print: "19 - 20 kmpl"
// model: "Datsun_GO_Plus"
// pictures: ['available']
// price: 4.26
// price_print: "₹ 4.26 - 7 Lakh"
// rowstatus: 1
// seating_capacity: "7 Seater"
// transmission: "Manual, Automatic"
// _id: "62945cb7573a853bababe9c6"
