import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, FormArray } from '@angular/forms';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { isPlatformBrowser } from "@angular/common";
import { ToastrManager } from 'ng6-toastr-notifications';
import { FileSelectDirective,FileUploader } from 'ng2-file-upload';
import { promise } from 'protractor';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  uploader:FileUploader = new FileUploader({})
  imageUploadURLSC:any

  otpFormSubmit: boolean = false;

  otpflg: boolean = false;
  otpForm: FormGroup;
  otpPage: FormGroup;
  confirmOTP: FormGroup;
  // modalRef1?: BsModalRef;
  number: any
  OTP: Number
  otptime: any
  validateOTPFormSubmit
  // priyanka
  Searchdata: any = [];
  Selecteddata: any = [];
  otpno: any;
  newotpno: any;
  newotpno11: any;
  msg: any;
  displayno: any;
  classactive: string = '';
  cursorvalue: string = 'default';
  disableButton: boolean = true;
  newotpnotwo: any;

  loginuserflag: boolean = true;

  //register varibale
  registerno: any;
  regmsg: any;
  registername: any;
  registeremail: any;
  registerlocation: any;
  registerflag: boolean = false;

  userflagname: boolean = false;
  username: any;
  userdata:any = [];
  getuserdatadecrypt = [];
  userinfoencrypt: any;
  userinfodecrypt: any;

  //send user id for add cars in user collection
  globaluserid: any;


  //register page number issue
  register_msg: any;
  registeriNo: any;

  //sell cars arrays 28-10-2022
  car_brands: any = [];
  car_fuel: any = [];
  modelBrand: any;
  modelModel:any;
  modelFuel:any;

  carModelArray: any = [];

  selectedCarMonth:any="Select Month"
  //form
  selectCarMonth:any;
  monthArray:any=["JAN","FEB","MARCH","APR","MAY","JUN","JULY","AUG","SEP","OCT","NOV","DEC"]

  selectedCarYear:any="Select Year"
  //form
  selectCarYear:any;
  yearArray:any=["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020",
                 "2021","2022","2023"]

  monthyearflag: boolean = false;


  //info form
  infoForm: FormGroup;

  //Owner
  allOwner:any=[
    {_id:1},{_id:2},{_id:3},{_id:4},{_id:5},{_id:6},{_id:7},{_id:8}
    
  ]
  selectOwner:any="Select Owner"
  selectedOwnerNG:any;


  allCity:any=[
    {_id:"Mumbai"},{_id:"Thane"},{_id:"Dadar"},{_id:"Sion"}, 
  ]
  selectCity:any="Select City"
  selectedCityNG:any;

  //car insurance valid date
  insuranceValidDate:any;

  //image uploading 29-10-2022
  selectedSellCarImg:any;
  userinfodecryptGETHeader:any;

  userDataInHome:any;

  sellcaruserdata:any
  sellcarusernamebind:any;

  selectedFileV:any;
  imageNameV: any;
  imageV:any;

  //upload file done 03-11-2022
  selectedFileNameBE:any;
  selectedFileNameBEUrl:any;

  //create name of image 04-11-2022
  uploadImgFileName:any;
  uploadImgApiFileName:any;

  //active user and inactive user
  activeUser:boolean=false;
  inactiveUser:boolean=true;

  //selectedBanner Image 21-11-2022
  selectedBannerImg:any;
  uploadBannerImgFileName:any;
  selectedBannerFileNameBE:any;
  selectedBannerFileNameBEUrl:any;
  imageBannerNameV: any;
  imageBannerV:any;
  newuploadBannerImgFileName:any;
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object,// private modalService: BsModalService,
    private globalservice: GlobalService, private http: HttpClient, private router: Router,private fb: FormBuilder,public toastr: ToastrManager) {

      this.infoForm=this.fb.group({
        // brandH:this.modelBrand,
        // modelH:this.modelModel,
        // fuelTypeH:this.modelFuel,
        // monthH:this.selectCarYear,
        // yearH: this.selectCarYear,
        ownerH:new FormControl(),
        colorH: new FormControl(),
        kdDoneH: new FormControl(),
        cityH: new FormControl(),
        registrationNoH: new FormControl(),
        registrationAtH: new FormControl(),
        lifeTimeTaxH: new FormControl('Individual'),
        carInsuranceH: new FormControl('Comprehensive'),
        insuranceValidTillH: new FormControl('Comprehensive'),
        estimatedPriceH: new FormControl(),
        isCarAccidentalH: new FormControl('Yes'),
        isCarFloodAffectedH: new FormControl('Yes'),

      })
    
      
      

    }

  ngOnInit(): void {

    console.log("PRINT 1------------------------------------->");
    
    //here we check user data present in localstorage if yes then sell car button clickable and not then its not
    var encryptSecretKeySC = "aaaaa";
    var getlocaldataSC = localStorage.getItem("userinfo")
    

    var newdataone = CryptoJS.AES.decrypt(getlocaldataSC, encryptSecretKeySC);
    this.sellcaruserdata = JSON.parse(newdataone.toString(CryptoJS.enc.Utf8));
    //29-11-2022
    console.log("NgOnInit() get local data--------------------->",this.sellcaruserdata);
    

    //check user login or not using localstorage  29-11-2022 comment also code of sellcarsid because we only display login model and sellcar model, for login and not login user 
    if(this.sellcaruserdata){
       // console.log("user present------------------------------------------------->"); 
      this.activeUser=true;
      this.inactiveUser=false;
      // var element = document.getElementById("sellcarsid");
      // element.classList.remove("sellcarsclass");
    }else{
       // console.log("user not present--------------------------------------------->"); 
      this.activeUser=false;
      this.inactiveUser=true;
      // var element = document.getElementById("sellcarsid");
      // element.classList.add("sellcarsclass");
    }

   

    console.log("in ngOnInit")
    this.otpForm = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])

    })

    this.otpPage = new FormGroup({
      otpno: new FormControl('', [Validators.required])

    })

    this.confirmOTP = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.min(4)])
    })


    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userinfo') != null) {
        //login info decryption
        var encryptSecretKey = "aaaaa";
        var getlocaldata = localStorage.getItem("userinfo")


        this.userinfodecrypt = CryptoJS.AES.decrypt(getlocaldata, encryptSecretKey);
        this.getuserdatadecrypt = JSON.parse(this.userinfodecrypt.toString(CryptoJS.enc.Utf8));

        console.log("userinfodecrypt data H", this.getuserdatadecrypt);



        //this.username=this.getuserdatadecrypt;
        console.log("this.getuserdatadecrypt H", this.getuserdatadecrypt)
        console.log("this.getuserdatadecrypt H", this.getuserdatadecrypt["name"]);
        this.username = this.getuserdatadecrypt["name"];
        this.userflagname = true;

      } else {
        console.log("user not login ")
        this.userflagname = false;
      }
    }


    //old sell cars pages
    this.car_brands = [
      { path: 'assets/brands/hyundai.PNG', brand: 'Hyundai' }, { path: 'assets/brands/isuzu.PNG', brand: 'Isuzu' },
      { path: 'assets/brands/jeep.PNG', brand: 'Jeep' }, { path: 'assets/brands/lambo.PNG', brand: 'Lamborghini' },
      { path: 'assets/brands/msuzuki.PNG', brand: 'Maruti' }, { path: 'assets/brands/tata.PNG', brand: 'Tata' },
      { path: 'assets/brands/toyota.PNG', brand: 'Toyota' }, { path: 'assets/brands/astron-martin.PNG', brand: 'Aston Martin' },
      { path: 'assets/brands/audi.PNG', brand: 'Audi' }, { path: 'assets/brands/honda.PNG', brand: 'Honda' },
      { path: 'assets/brands/bmw.PNG', brand: 'BMW' }, { path: 'assets/brands/bugatti.PNG', brand: 'Bugatti' },
      { path: 'assets/brands/citroen.PNG', brand: 'Citroen' }, { path: 'assets/brands/datsun.PNG', brand: 'Datsun' },
      { path: 'assets/brands/dc-design.PNG', brand: 'DC Design' }, { path: 'assets/brands/ferrari.PNG', brand: 'Ferrari' },
      { path: 'assets/brands/fiat.PNG', brand: 'Fiat' }, { path: 'assets/brands/force.PNG', brand: 'Force Motors' },
    ]

    this.car_fuel = [
      { path: 'assets/Images/selectpetrol.PNG', name: 'Petrol' },
      { path: 'assets/Images/selectcng.PNG', name: 'CNG' },
      { path: 'assets/Images/selectdiesel.PNG', name: 'Diesel' },
    ]

  }

  


  otpCall(template2) {
    //console.log("otpForm",this.otpForm)
    console.log("otpCall template2", template2);
    console.log("old otp no------->", this.newotpno11);
    console.log("updated otp===========>", this.newotpno)
    this.otpno = ""


    if (template2) {
      //    this.openModal(template2)
      this.displayno = template2;
      console.log("true");
      this.msg = "OTP has been sent successfully";
      this.sendOTP(template2)
    } else {
      console.log("wrong number");

    }

  }


  otpCallTwo(template2) {
    //console.log("otpForm",this.otpForm)
    console.log("otpCall", template2.length);
    console.log("old otp no------->", this.newotpno11);
    console.log("updated otp===========>", this.newotpno)
    if (template2.length == 10) {
      if (template2) {
        //    this.openModal(template2)
        this.displayno = template2;
        console.log("true");
        this.msg = "OTP has been sent successfully";
        this.sendOTP(template2)
      } else {
        console.log("wrong number");
      }
    }
    else {
      this.msg = "Please enter valid mobile number"
    }


  }


  resendotpCall() {
    if (this.displayno) {
      console.log("true");
      this.msg = "OTP has been sent successfully";
      this.sendOTP(this.displayno)




    } else {
      console.log("wrong number");

    }

  }

  displaydiv(event) {
    console.log("css call here");
    this.newotpno = this.displayno;
    document.getElementById("abc").style.display = "initial";

    document.getElementById("resendotpid").style.display = "none";
    event.preventDefault();

    // const el = event.target;
    // el.setAttribute('style', 'display: none');
  }

  ngOnChanges() {

  }

  keyPress(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;
    console.log("value------->", value)
    console.log("value------->", value.length)
    var minNumber = value.length + 1;
    console.log("min Number", minNumber);
    let button = document.getElementById("btnsendotp")

    // if(minNumber == 10){
    //   this.classactive='';
    // console.log("in if")
    // // button.disabled="disabled"
    //   //document.getElementById("sendotpbtn").style.display="initial";
    // }else{
    //   this.classactive='disable';

    //   document.getElementById("sendotpbtn").style.display="disable";
    // }

    if (minNumber == 11) {
      document.getElementById('btnsendotp').removeAttribute("disabled");
    } else {
      document.getElementById('btnsendotp').setAttribute("disabled", null);
    }
  }



  registerkeyPress(event: KeyboardEvent) {

    let url = this.globalservice.base_path_api() + 'user/getuser';
    // let url = 'http://localhost:3000/api/v1/user/getuser';
    console.log("this register number ",);

    const body = {
      "mobilenumber": this.registerno,
    };

    this.http.post<any>(url, body).subscribe(rsp => {
      console.log("data vishal registerkeyPress", rsp);
      // console.log("----->",rsp.data.otp)
      // this.globaluserid=rsp.data.user_id;
      // console.log("global user id",this.globaluserid);
      //call once
      //   this.sendUserId()


      if (rsp.data.length > 0 && nameLength >= 0) {
        // this.register_msg="Fill other info"
        // console.log("else part of r",this.register_msg);
        console.log("registerkeyPress if part call");

        this.register_msg = "Number alredy exist, please try another number"
        console.log("else part of r registerkeyPress", this.register_msg);

        document.getElementById('registerbtn').setAttribute("disabled", null);
        // document.getElementById('gohomeBtn').removeAttribute("disabled");
      }
      else {
        // this.register_msg="Number alredy exist, Please try another number"
        // console.log("else part of r",this.register_msg);
        // this.register_msg="Fill other info"
        // console.log("else part of r",this.register_msg);
        // document.getElementById('gohomeBtn').setAttribute("disabled", null);
        console.log("else codintion run registerkeyPress");

        document.getElementById('registerbtn').removeAttribute("disabled");
      }
    })



    let value = (<HTMLInputElement>event.target).value;
    console.log("value------->", value)
    console.log("value------->", value.length)
    var nameLength = value.length + 1;
    console.log("min Number", nameLength);

    //   if (nameLength>=4) {
    //     document.getElementById('registerbtn').removeAttribute("disabled");
    //  } else{
    //     document.getElementById('registerbtn').setAttribute("disabled", null);
    //  }
  }


  verifyOTP(event: KeyboardEvent) {
    var value = (<HTMLInputElement>event.target).value;
    console.log("value------->", value)
    console.log("value------->", value.length)
    var nameLength = value.length + 1;
    console.log("min Number", nameLength);
    var vOTPValue = Number(value)
    var fourDigit = this.OTP

    if (vOTPValue == fourDigit) {
      document.getElementById('vOTP').removeAttribute("disabled");
      this.msg = "Valid OTP , Click Verify OTP button "
    } else {
      document.getElementById('vOTP').setAttribute("disabled", null);
      this.msg = "Invalid OTP"
    }
  }


  verifyrNumber(event: KeyboardEvent) {

    var value = (<HTMLInputElement>event.target).value;
    console.log("value------->", value)
    var vOTPValue = Number(value)
    this.registeriNo = vOTPValue
    console.log("r mobile in number", this.registeriNo);

    console.log("register submit btn call", this.registerno);
    let url = this.globalservice.base_path_api() + 'user/getuser';
    // let url = 'http://localhost:3000/api/v1/user/getuser';
    const body = {
      "mobilenumber": this.registerno,
    };

    this.http.post<any>(url, body).subscribe(rsp => {
      console.log("data vishal", rsp);
      // console.log("----->",rsp.data.otp)
      // this.globaluserid=rsp.data.user_id;
      // console.log("global user id",this.globaluserid);
      //call once
      //   this.sendUserId()


      if (rsp.data.length > 0) {
        // this.register_msg="Fill other info"
        // console.log("else part of r",this.register_msg);
        this.register_msg = "Number alredy exist, please try another number."
        console.log("else part of r verifyrNumber", this.register_msg);

        document.getElementById('registerbtn').setAttribute("disabled", null);
        document.getElementById('gohomeBtn').removeAttribute("disabled");
      }
      else {
        // this.register_msg="Number alredy exist, Please try another number"
        // console.log("else part of r",this.register_msg);
        // this.register_msg="Fill other info"
        // console.log("else part of r",this.register_msg);
        if (value.length <= 9) {
          document.getElementById('registerbtn').setAttribute("disabled", null);
          document.getElementById('gohomeBtn').removeAttribute("disabled");
          this.register_msg = ""
        }
        else {
          document.getElementById('gohomeBtn').setAttribute("disabled", null);
          document.getElementById('registerbtn').removeAttribute("disabled");
          this.register_msg = ""
        }


      }
    })


  }


  goHome() {
    console.log("goHome button click");
    this.username = "";
    localStorage.removeItem("userinfo");
    localStorage.removeItem("userdata");
    //reload entire page for home page
    window.location.reload();
  }


  otpCallPage(event: any) {
    //enable sell car <a></a> tag name 03-11-2022
    // var element = document.getElementById("sellcarsid");
    // element.classList.remove("sellcarsclass");
    this.modelArray()

    console.log("this.otpno", this.otpno);

    // console.log("this input value",otpno);
    console.log("this.OTP", this.OTP);

    if (this.otpno == this.OTP) {
      console.log("ho to home page")
      this.msg = "Login successfully";
      //login info encryption
      var encryptSecretKey = "aaaaa";
      this.userinfoencrypt = CryptoJS.AES.encrypt(JSON.stringify(this.userdata), encryptSecretKey).toString();
      // console.log("jpencrypt====>",jpencrypt);
      localStorage.setItem("userinfo", this.userinfoencrypt);

      
      
      
      
      localStorage.setItem("userdata", JSON.stringify(this.userdata));

      //when new user login then we want to reload window for get local storage info
      // window.location.reload();
      // window.open( this.globalservice +"/home");
      // history.go(0);
      this.router.navigate(['/home'])

    } else {
      console.log("invalid otp");
      this.msg = "Invalid OTP .Please resent otp";
    }
    

  }


  modelArray(){
    // console.log("call arays--------------------------------------------->");
    
    //old sell cars pages
    this.car_brands = [
      { path: 'assets/brands/hyundai.PNG', brand: 'Hyundai' }, { path: 'assets/brands/isuzu.PNG', brand: 'Isuzu' },
      { path: 'assets/brands/jeep.PNG', brand: 'Jeep' }, { path: 'assets/brands/lambo.PNG', brand: 'Lamborghini' },
      { path: 'assets/brands/msuzuki.PNG', brand: 'Maruti' }, { path: 'assets/brands/tata.PNG', brand: 'Tata' },
      { path: 'assets/brands/toyota.PNG', brand: 'Toyota' }, { path: 'assets/brands/astron-martin.PNG', brand: 'Aston Martin' },
      { path: 'assets/brands/audi.PNG', brand: 'Audi' }, { path: 'assets/brands/honda.PNG', brand: 'Honda' },
      { path: 'assets/brands/bmw.PNG', brand: 'BMW' }, { path: 'assets/brands/bugatti.PNG', brand: 'Bugatti' },
      { path: 'assets/brands/citroen.PNG', brand: 'Citroen' }, { path: 'assets/brands/datsun.PNG', brand: 'Datsun' },
      { path: 'assets/brands/dc-design.PNG', brand: 'DC Design' }, { path: 'assets/brands/ferrari.PNG', brand: 'Ferrari' },
      { path: 'assets/brands/fiat.PNG', brand: 'Fiat' }, { path: 'assets/brands/force.PNG', brand: 'Force Motors' },
    ]

    this.car_fuel = [
      { path: 'assets/Images/selectpetrol.PNG', name: 'Petrol' },
      { path: 'assets/Images/selectcng.PNG', name: 'CNG' },
      { path: 'assets/Images/selectdiesel.PNG', name: 'Diesel' },
    ]
  }

  openModal(template: TemplateRef<any>) {

    try {
      // this.modalRef1 = this.modalService.show(template)
    } catch (error) {
      console.log("error >>> ", error);

    }
  }



  sendOTP(template2) {
    console.log("vishal 1", template2);

    const body = {
      mobilenumber: template2
    };
    // let url = this.base_path_service.base_path_api() + 'user/loginViaPhone';
    // let url = 'https://fchapi.familycarehospitals.com/api/v1/user/loginViaPhone';
    let url = this.globalservice.base_path_api() + 'user/loginapi';
    // let url = 'http://localhost:3000/api/v1/user/loginapi';

    this.http.post<any>(url, body).subscribe(rsp => {
      console.log("data vishal sendOTPs function", rsp);
      console.log(" sendOTPs function ----->", rsp.data.otp)


      if (rsp.success == true) {
        this.username = rsp.data.name;
        this.userdata = rsp.data;
        console.log("sendOTP this userdata", this.userdata);
        console.log("name of usser in login", this.username);
        this.userflagname = true;
        this.OTP = rsp.data.otp;
        this.otpflg = true;

        //active and inactive user 07-11-2022
        this.activeUser=true;
        this.inactiveUser=false;

        // this.otptime = rsp.data.otptime



        // console.log({

        //   'this.OTP': this.OTP,
        //   ' this.otptime': this.otptime
        // });

      }
      else {
        this.msg = "Please register with your mobile number to get started";
        this.registerno = this.displayno;
        this.registerflag = true;
        event.preventDefault();

        console.log("non login else part call");

        setTimeout(() => {
          console.log("Delayed for 2 second.");
          this.loginuserflag = false;
        }, 50000)
        // this.loginuserflag=false;
      }

    })
  }

  // validateOTP(){
  //   let x = countdown(this.otptime).countdown().toString(); 
  //   console.log("test",x);
  //   moment
  // }

  Searchenterdata(e) {
    console.log("Search data", e);
    let url = this.globalservice.base_path_api() + 'cars/search-car/' + e;
    this.globalservice.PostRequest(url, {}).subscribe(res => {
      this.Searchdata = res.data
      console.log("Search data array", this.Searchdata);
    })
  }

  // searchTerm(e) {
  //   console.log("Search data", e);
  //   let url = this.globalservice.base_path_api() + 'cars/search-car/' + e;
  //   this.globalservice.PostRequest(url, {}).subscribe(res => {
  //     this.Searchdata = res.data
  //     console.log("Search data array", this.Searchdata);
  //     this.router.navigate(['/searchcars'],
  //       { queryParams: { data: JSON.stringify(this.Searchdata) } }
  //     );
  //   })
  // }

  searchclick() {
    console.log("hello priyanka");
    // let data = this.Selecteddata;
    // console.log("searchclick", data);
    // this.router.navigate(['/searchcars'],
    //   { queryParams: { data: JSON.stringify(data) } }
    // );
  }

  Searchtermdata(option) {
    console.log("selected data", option);
    // this.Selecteddata.push(option);
    // console.log("selected array data", this.Selecteddata);
    // this.router.navigate(['/searchcars'],
    //   { queryParams: { data: JSON.stringify(this.Selecteddata) } }
    // );
    console.log("id car", option.car_id);

    let url = this.globalservice.base_path_api() + 'cars/carid';
    const body = {
      car_id: option.car_id
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log("data", rsp.data);
      this.Selecteddata = rsp.data;
      console.log("array res", this.Selecteddata);
      this.router.navigate(['/cardetails'],
        { queryParams: { data: JSON.stringify(this.Selecteddata) } }
      );
    })
  }



  registerUser() {
    console.log("register submit btn call", this.registerno, this.registername, this.registeremail, this.registerlocation);
    let url = this.globalservice.base_path_api() + 'user/registerapi';
    // let url = 'http://localhost:3000/api/v1/user/registerapi';
    this.registerflag = false;
    this.displayno = this.registerno
    const body = {
      "mobilenumber": this.registerno,
      "name": this.registername,
      "email": this.registeremail,
      "location": this.registerlocation
    };



    this.http.post<any>(url, body).subscribe(rsp => {
      console.log("data vishal", rsp);
      console.log("registerUser ----->", rsp.data.otp)
      this.globaluserid = rsp.data.user_id;
      // console.log("global user id",this.globaluserid);
      //call once
      this.sendUserId()


      if (rsp.success == true) {
        this.OTP = rsp.data.otp;
        this.otpflg = true;
        this.username = rsp.data.name;
        this.userdata = rsp.data;
        console.log("register this userdata", this.userdata);
        
        //new user login then set user data in local storage 09-11-2022
        var encryptSecretKey = "aaaaa";
        this.userinfoencrypt = CryptoJS.AES.encrypt(JSON.stringify(this.userdata), encryptSecretKey).toString();
        // console.log("jpencrypt====>",jpencrypt);
        localStorage.setItem("userinfo", this.userinfoencrypt);
       
        

        //active user and inactive user 09-11-2022
        this.activeUser=true;
        this.inactiveUser=false;

        this.userflagname = true;
        console.log("name of usser in register", this.username);
      }
      else {
        this.msg = "Please register with your mobile number to get started";
        this.registerno = this.displayno
        console.log("non login else part call");
        this.registerflag = true;
        event.preventDefault();

        
        //active user and inactive user 09-11-2022
        this.inactiveUser=true;
        this.activeUser=false;
      }
    })

  }


  logoutUser() {
    console.log("Logout button call");

    this.userflagname = false;
    this.username = "";
    localStorage.removeItem("userinfo");
    localStorage.removeItem("userdata");
    //reload entire page for new user sign up
    // window.location.reload();
    //it refresh page and also remove local storage

    //active and inactive user
    this.inactiveUser=true;
    this.activeUser=false;
    
    //after
    // this.router.navigateByUrl[('/')]
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // window.location.reload();
    window.location.href = "/";
    //after disable sell car <a></a> tag name
    // var element = document.getElementById("sellcarsid");
    // element.classList.add("sellcarsclass");

    //before
    // window.open(
      // "http://dealcars.in/", "_self");
    // "http://localhost:4200/home", "_self");

  }

  //here we get current user id 
  sendUserId() {
    console.log("global user id with sendUserId", this.globaluserid);
    const body = {
      user_id: this.globaluserid
    }
    let url = this.globalservice.base_path_api() + 'user/useraddcars';
    // let url = 'http://localhost:3000/api/v1/user/useraddcars';
    this.http.post<any>(url, body).subscribe(rsp => {
      console.log(" sendUserId data vishal", rsp);
      // console.log("----->",rsp.data.otp)
      // this.globaluserid=rsp.data.user_id;
      // console.log("global user id",this.globaluserid);
      //call once
      // this.sendUserId()


      //  if (rsp.success == true) {
      //     this.OTP = rsp.data.otp;
      //     this.otpflg=true;
      //     this.username=rsp.data.name;
      //     this.userdata=rsp.data;
      //     this.userflagname=true;
      //     console.log("name of usser in register",this.username);
      //   }
      //   else{
      //     this.msg="Please register with your mobile number to get started";
      //     this.registerno=this.displayno
      //     console.log("non login else part call");
      //     this.registerflag=true;
      //     event.preventDefault(); 
      //    }
    })

  }


  crossBtnOtp(){

      location.reload();
 
  }


  //go to old sell cars form
  // goToSellCars(){
  //   console.log("get route aplication");
    
  //   this.router.navigate(["/sellcar"])
  // }

  goToServiceModel(){
    console.log("go to service model");
    this.router.navigate(['/Selectmodals'])
  }



  onBrandModelClick(b) {
    console.log(b, b.brand);
    this.modelBrand = b.brand
    // console.log("get selected brand",this.modelBrand);

    if (this.modelBrand) {
      document.getElementById('brandModelNextBtn').removeAttribute("disabled");
    } else {
      document.getElementById('brandModelNextBtn').setAttribute("disabled", null);
    }
    
  }


  // modelBrandNext() {
  //   if (this.modelBrand == null) {
  //     alert('Please select brand')
  //   } else {

  //     let url = this.globalservice.base_path_api() + 'cars/filteralldata';
  //     const body = {
  //       brand: this.modelBrand,
  //     }
  //     this.globalservice.PostRequest(url, body).subscribe(rsp => {
  //       var filterdata = rsp.data;
  //       this.carModelArray = filterdata;
  //       console.log(" array res car Model Array", this.carModelArray);
  //     })
  //   }
  // }


  modelBrandNext() {
    if (this.modelBrand == null) {
      alert('Please select brand')
    } else {

      let url2=this.globalservice.base_path_api() + 'cars/getbranddetails'
      const body = {
        brand: this.modelBrand,
      }
      this.globalservice.PostRequest(url2, body).subscribe(rsp => {
        var filterdata = rsp.data;
        this.carModelArray = filterdata;
        console.log(" array res car Model Array", this.carModelArray);
      }) 
    }
  }


  

  onModelClick(event:any){
    // console.log("get click model",event);
    this.modelModel=event.model
    // console.log("get model of brand",this.modelModel);
    if (this.modelModel) {
      document.getElementById('modelModelNextBtn').removeAttribute("disabled");
    } else {
      document.getElementById('modelModelNextBtn').setAttribute("disabled", null);
    }
  }

  onFuelModelClick(event:any){
    // console.log("get fual type",event.name);
    this.modelFuel=event.name
    // console.log("get model fuel type",this.modelFuel);
    if (this.modelFuel) {
      document.getElementById('fuelModelNextBtn').removeAttribute("disabled");
    } else {
      document.getElementById('fuelModelNextBtn').setAttribute("disabled", null);
    }
  }

  getCarMonth(){
      //  console.log("get Seleted car month",this.selectCarMonth);
       if (this.selectCarMonth) {
        document.getElementById('selecteCarDateId').removeAttribute("disabled");
       } else {
        document.getElementById('selecteCarDateId').setAttribute("disabled", null);
       }
  }

  getCarYear(){
    // console.log("get Seleted car month",this.selectCarYear);
    if (this.selectCarYear) {
      document.getElementById('monthYearNextBtn').removeAttribute("disabled");
      this.monthyearflag = true;
     } else {
      document.getElementById('monthYearNextBtn').setAttribute("disabled", null);
      this.monthyearflag = false;
     }
  }


  //info form
  getOwnerSC(){
    // console.log("get owner ",this.selectedOwnerNG);
    if(this.selectedOwnerNG){
      // console.log("Owner GET");
      // this.getCAROwner=true
    }else{
      // console.log("NOT GET Owner");
      // this.getCAROwner=false
    }
  }


  


  // selectedImage(event){
  //   console.log("selected image",event);
   

  //   var file=event.target.files[0].name;
  //   this.selectedSellCarImg=file
  //   console.log("vishal file from if statement 2",this.selectedSellCarImg);

  //   if (this.selectedSellCarImg) {
  //     document.getElementById('uploadImgId').removeAttribute("disabled");
  //    } else {
  //     document.getElementById('uploadImgId').setAttribute("disabled", null);
  //    }

   
  // }


  //image upload logic
  selectedImageBE(event:any){
  
    //upload button logic
  
    if(event.target.files.length>0){
      document.getElementById('uploadImgIdBE').removeAttribute("disabled");
      this.selectedFileV=<File>event.target.files[0];
      // console.log("selected file V selectedImageBE",this.selectedFileV);
      // console.log("selected file V selectedImageBE---------->",this.selectedFileV.lastModified);
      var newonedata=/[^/]*$/.exec(this.selectedFileV.type)[0];
      // console.log("selected file V selectedImageBE file type---------->",newonedata);
      this.uploadImgFileName=this.selectedFileV.lastModified + "." + newonedata
      // console.log("vvvvvvvvvvvvvvvvvv------------------------------>",this.uploadImgFileName);
      
      
      this.selectedFileNameBE=this.selectedFileV.name
      // console.log("selected File Name BE-------------->",this.selectedFileNameBE);
      
      var newfile=this.selectedFileV.name
      // console.log("new file name selectedImageBE",newfile);
      
      var extension=newfile.split('.')[1]
      // console.log("here get exntension of new file selectedImageBE",extension);
  
      if(extension == "jpg" || extension == "jpeg" || extension == "png"){
        this.imageNameV=this.selectedFileV.name
        // console.log(this.imageNameV,"check extention is valid or not, it valid selectedImageBE"); 
        //Call upload image in local or server when file is correct format
        this.uploadYourCarClickBE()       
      }else{
        alert("please add file extension with jpg, jpeg and png selectedImageBE")
      }
      // console.log(this.imageNameV,"after if else statement image name selectedImageBE");
    }else{
      document.getElementById('uploadImgIdBE').setAttribute("disabled", null);
      // console.log("image not selected");
      
    }
  
  
  
    }
  
  
    uploadYourCarClickBE(){
      //05-11-2022
      // console.log("uploadYourCarClickBE click file------------->");
      
      // console.log("this selected file v");
      
      const imageBlob=this.selectedFileV
      console.log("imageBlob data this.selectedFileV------------",this.selectedFileV);
      
      const file=new FormData()
      file.set('file',imageBlob)
  
      let uploadsellcarURL=this.globalservice.base_path_api() + 'car-sale/uploadimg';
  
      this.globalservice.PostRequest(uploadsellcarURL,file).subscribe(rsp => {
        // console.log("rsp of uploadimg api",rsp);
        this.uploadImgApiFileName=rsp.data.filename
        // console.log("file name",this.uploadImgApiFileName);
      })
    }

  


  infoFormSubmit(){
    

    // console.log("get brand name",this.modelBrand,"get brand model",this.modelModel,"get model fuel",this.modelFuel,"select month",this.selectCarMonth,"select year",this.selectCarYear);
    
    // console.log("get form data",this.infoForm);

    var encryptSecretKeySC = "aaaaa";
    var getlocaldataSC = localStorage.getItem("userinfo")


    var newdataone = CryptoJS.AES.decrypt(getlocaldataSC, encryptSecretKeySC);
    this.sellcaruserdata = JSON.parse(newdataone.toString(CryptoJS.enc.Utf8));

    // console.log("newdatatwo after call infoFormSubmit H", this.sellcaruserdata);
    // console.log("selected file name in inFormSubmit",this.selectedFileNameBE);
    this.selectedFileNameBEUrl=this.globalservice.base_path_api_url()+"sellcarsimg/"+this.uploadImgApiFileName
    // console.log("get selected file name url-------------------",this.selectedFileNameBEUrl);
    
    
    let sendsellcar=this.globalservice.base_path_api() + 'car-sale/addsellcar';
    let body={
      brand:this.modelBrand,
      model:this.modelModel,
      fueltype:this.modelFuel,
      month:this.selectCarMonth,
      year:this.selectCarYear,
      owner:this.infoForm.value.ownerH,
      color:this.infoForm.value.colorH,
      kd_Done:this.infoForm.value.kdDoneH,
      city:this.infoForm.value.cityH,
      registration_no:this.infoForm.value.registrationNoH,
      registration_at:this.infoForm.value.registrationAtH,
      life_time_tax:this.infoForm.value.lifeTimeTaxH,
      car_insurance:this.infoForm.value.carInsuranceH,
      insurance_valid_till:this.infoForm.value.insuranceValidTillH,
      estimated_price:this.infoForm.value.estimatedPriceH,
      is_car_accidental:this.infoForm.value.isCarAccidentalH,
      is_car_flood_affected:this.infoForm.value.isCarFloodAffectedH,
      sellcar_img:this.selectedFileNameBEUrl,
      sellcaruser:this.sellcaruserdata.name,
      sellcarusernumber:this.sellcaruserdata.mobilenumber
    }

    

    this.globalservice.PostRequest(sendsellcar, body).subscribe(rsp => {
      console.log("get added sell car object", rsp.data);
      this.sellcarusernamebind=rsp.data.sellcaruser
      // console.log("bind sell car user data",this.sellcarusernamebind);
      
      

      if(rsp.data){
        
        this.toastr.successToastr('Thanks for registration your car!', 'Success!');

        setTimeout(()=>{
          this.infoForm.reset()
        },3000)
      }
      else{
        // console.log("sell cars form failed");
        this.toastr.errorToastr('This is error.', 'Oops!');
      }
    })
    
  }

  getCitySC(){
    // console.log("Get City",this.selectedCityNG);
    
  }

  getIVD(){
    // console.log("insurance valid date",this.insuranceValidDate);
  }


  thanksPageReload(){
    // console.log("call reload page button");
    //navigate to home page
    this.router.navigate[('/')]

    //remove css of sell car button
    // var element = document.getElementById("sellcarsid");
    // element.classList.remove("sellcarsclass");

    //set all model next button to disable
    document.getElementById('brandModelNextBtn').setAttribute("disabled", null);
    document.getElementById('modelModelNextBtn').setAttribute("disabled", null);
    document.getElementById('fuelModelNextBtn').setAttribute("disabled", null);
    document.getElementById('monthYearNextBtn').setAttribute("disabled", null);
    document.getElementById('uploadImgIdBE').setAttribute("disabled", null);
  }


  //new banner upload 21-11-2022
  selectedBannerImageBE(event:any){
  
    //upload button logic
  
 
    
      this.selectedBannerImg=<File>event.target.files[0];
      console.log("selected file VVVV selectedBannerImg",this.selectedBannerImg);
      // console.log("selected file V selectedImageBE---------->",this.selectedFileV.lastModified);
      var newonedata=/[^/]*$/.exec(this.selectedBannerImg.type)[0];
      // console.log("selected file V selectedImageBE file type---------->",newonedata);
      this.uploadBannerImgFileName=this.selectedBannerImg.lastModified + "." + newonedata
      console.log("uploadBannerImgFileName------------------------------>",this.uploadBannerImgFileName);
      
      
      this.selectedBannerFileNameBE=this.selectedBannerImg.name
      console.log("selected File Name BE-------------->",this.selectedBannerFileNameBE);
      
      var newfile=this.selectedBannerImg.name
      // console.log("new file name selectedImageBE",newfile);
      
      var extension=newfile.split('.')[1]
      console.log("here get exntension of new file selectedImageBE",extension);
  
      if(extension == "jpg" || extension == "jpeg" || extension == "png"){
        this.imageBannerNameV=this.selectedBannerImg.name
        // console.log(this.imageNameV,"check extention is valid or not, it valid selectedImageBE"); 
        //Call upload image in local or server when file is correct format
        // this.uploadBannerHere()       
        document.getElementById('bannerUploadBtn').removeAttribute("disabled");
      }else{
        alert("please add file extension with jpg, jpeg and png selectedImageBE")
        document.getElementById('bannerUploadBtn').setAttribute("disabled", null);
      }
     
    
  
  
  
    }



    uploadBannerHere(){
     
      
      const imageBlob=this.selectedBannerImg
      console.log("imageBlob data uploadBannerHere------------",imageBlob);
      
      const file=new FormData()
      file.set('file',imageBlob)
  
      let uploadBannercarURL=this.globalservice.base_path_api() + 'adsbanner/uploadbannerimg';
  
      this.globalservice.PostRequest(uploadBannercarURL,file).subscribe(rsp => {
        // console.log("rsp of uploadimg api",rsp);
        this.newuploadBannerImgFileName=rsp.data
        console.log("file name newuploadBannerImgFileName---------->",this.newuploadBannerImgFileName);
      })
    }




  






}
