import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterPipe } from 'src/app/filter.pipe';
import * as CryptoJS from 'crypto-js';
import { isPlatformBrowser } from "@angular/common";
// import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-searchcar',
  templateUrl: './searchcar.component.html',
  styleUrls: ['./searchcar.component.scss']
})
export class SearchcarComponent implements OnInit {
  // minPrice;
  // maxPrice;
  // value: any = 0;
  // highValue: any = 990000000;
  // options: Options = {
  //   floor: 0,
  //   ceil: 990000000,
  //   translate: (value: number, label: LabelType): string => {
  //     switch (label) {
  //       case LabelType.Low:
  //         this.minPrice = value;
  //         console.log(this.minPrice);
  //         return '<b>Min:</b> Rs. ' + this.minPrice;

  //       case LabelType.High:
  //         this.maxPrice = this.highValue;
  //         console.log(this.maxPrice)
  //         return '<b>Max:</b> Rs. ' + this.maxPrice;
  //       default:
  //         return 'Rs. ' + value;
  //     }

  //   },
  //   noSwitching: true,
  // };
  isVarientdata: Boolean = false;
  Selectedvarientsdata: any = [];
  name: string;
  searchText: string = "";
  selected_count: number = 0;
  selected_carbrand: any = [];
  carbrandname: any = [];
  selected_carbudget: any = [];
  selected_carvehicle: any = [];
  selected_carfuel: any = [];
  selected_cartransmission: any = [];
  selected_carSeats: any = [];
  selected_carMileage: any = [];
  selected_carEngiDis: any = [];
  selected_Airbag: any = [];
  selected_carEmission: any = [];
  cardata: any = [];
  Mileagedata: any;
  EngineDisdata: any;
  loader: boolean = false;
  notfound: boolean = false;
  Matchcardata: any = [];
  carvehiclename: any = [];
  carOffers: any = [];

  //here add varibale for local storage
  getUser = [];
  userInfo: any;
  userName: any;
  localregisterno: any;

  //sorted data array
  priceHighToLow: any = []
  priceLowToHigh: any = []
  ModelAtoZ: any = [];
  ModelZtoA: any = []

  newobject: any = []

  //here we get varients of cars
  varientsData: any = [
    // {varient:"A1",price_print:"11LAKH",engine:"1999cc",mileage_print:"21KM"},
    // {varient:"A2",price_print:"12LAKH",engine:"1999cc",mileage_print:"22KM"},
    // {varient:"A3",price_print:"13LAKH",engine:"1999cc",mileage_print:"23KM"},
    // {varient:"A4",price_print:"14LAKH",engine:"1999cc",mileage_print:"24KM"}
  ]






  // Data Object to List 
  carsbrand: any = [
    // { name: "", selected: false },
    //  { name: 'Kia', id: 2, selected: false },
    // { name: 'Lamborghini', id: 3, selected: false }, { name: 'Hyundai', id: 4, selected: false },
    // { name: 'Isuzu', id: 5, selected: false }, { name: 'Maruti', id: 6, selected: false },
    // { name: 'Tata', id: 7, selected: false }, { name: 'Toyota', id: 8, selected: false },
    // { name: 'Aston Martin', id: 9, selected: false }, { name: 'Audi', id: 10, selected: false },
    // { name: 'Honda', id: 11, selected: false }, { name: 'BMW', id: 12, selected: false },
    // { name: 'Bugatti', id: 13, selected: false }, { name: 'Datsun', id: 14, selected: false },
    // { name: 'DC Design', id: 15, selected: false }, { name: 'Ferrari', id: 16, selected: false },
    // { name: 'Fiat', id: 17, selected: false }, { name: 'Force Motors', id: 18, selected: false },
    // { name: 'Rolls Royce', id: 19, selected: false }, { name: 'Porsche', id: 20, selected: false },
    // { name: 'Nissan', id: 21, selected: false }, { name: 'MercedesBenz', id: 22, selected: false },
    // { name: 'Mahindra', id: 23, selected: false }, { name: 'Skoda', id: 24, selected: false },
    // { name: 'Volkswagen', id: 25, selected: false }, { name: 'Maserati', id: 26, selected: false },
    // { name: 'Bentley', id: 27, selected: false }, { name: 'Volvo', id: 28, selected: false },
    // { name: 'Ford', id: 29, selected: false }, { name: 'Renault', id: 30, selected: false },
    // { name: 'MG', id: 31, selected: false }, { name: 'Jaguar', id: 32, selected: false },
    // { name: 'MINI', id: 33, selected: false }, { name: 'Citroen', id: 34, selected: false },
    // { name: 'Lexus', id: 35, selected: false },
  ]

  car_budget = [
    { price: "0-3 LAKH", firstprice: '00.00', secondprice: '03.00', id: 1, selected: false },
    { price: "2-5 LAKH", firstprice: '02.00', secondprice: '05.00', id: 2, selected: false },
    { price: "5-8 LAKH", firstprice: '05.00', secondprice: '08.00', id: 3, selected: false },
    { price: "6-10 LAKH", firstprice: '06.00', secondprice: '10.00', id: 4, selected: false },
    { price: "8-12 LAKH", firstprice: '08.00', secondprice: '12.00', id: 5, selected: false },
    { price: "10-20 LAKH", firstprice: '10.00', secondprice: '20.00', id: 6, selected: false },
    { price: "20-30 LAKH", firstprice: '20.00', secondprice: '30.00', id: 7, selected: false },
    { price: "30-40 LAKH", firstprice: '30.00', secondprice: '40.00', id: 8, selected: false },
    { price: "40-50 LAKH", firstprice: '40.00', secondprice: '50.00', id: 9, selected: false },
    { price: "60-80 LAKH", firstprice: '60.00', secondprice: '80.00', id: 10, selected: false },
    { price: "90 LAKH-1 CRORE", firstprice: '90.00', secondprice: '100.00', id: 11, selected: false },
    { price: "1 CRORE+", firstprice: '100.00', secondprice: '9900.00', id: 12, selected: false }
  ]

  VehicleType = [
    { name: 'MUV', selected: false, id: 1 }, { name: 'SUV', selected: false, id: 2 },
    { name: 'Roadster', selected: false, id: 3 }, { name: 'Crossover', selected: false, id: 4 },
    { name: 'Estate', selected: false, id: 5 }, { name: 'Coupe', selected: false, id: 6 },
    { name: 'Hatchback', selected: false, id: 7 }, { name: 'Sedan', selected: false, id: 8 },
  ]

  FuelType = [
    { name: 'Petrol', selected: false }, { name: 'Diesel', selected: false },
    { name: 'CNG', selected: false }, { name: 'Electric', selected: false },
  ]

  Transmission = [
    { name: 'Manual', selected: false }, { name: 'Automatic', selected: false },
    { name: 'Manual, Automatic', selected: false },
  ]

  SeatingCapacity = [
    { seats: '2', selected: false }, { seats: '3', selected: false }, { seats: '4', selected: false },
    { seats: '5', selected: false }, { seats: '6', selected: false },
    { seats: '7', selected: false }, { seats: '8', selected: false }, { seats: '9', selected: false },
    { seats: '10', selected: false }, { seats: '11', selected: false }, { seats: '12', selected: false },
    { seats: '13', selected: false }, { seats: '14', selected: false }, { seats: '15', selected: false },
  ]

  Mileage = [
    { mail: '0-5 kmpl', firstmail: '0', secondmail: '5', selected: false },
    { mail: '5-10 kmpl', firstmail: '5', secondmail: '10', selected: false },
    { mail: '10-20 kmpl', firstmail: '10', secondmail: '15', selected: false },
    { mail: '15-20 kmpl', firstmail: '15', secondmail: '20', selected: false },
    { mail: '20-25 kmpl', firstmail: '20', secondmail: '25', selected: false },
    { mail: '25-30 kmpl', firstmail: '25', secondmail: '30', selected: false },
    { mail: '30-35 kmpl', firstmail: '30', secondmail: '35', selected: false },
    { mail: '35-40 kmpl', firstmail: '35', secondmail: '40', selected: false },
    { mail: '40-50 kmpl', firstmail: '40', secondmail: '50', selected: false },
  ]

  EngineDisplacement = [
    { dis: '700-1000 cc', firstdis: '700', seconddis: '1000', selected: false },
    { dis: '1000-2000 cc', firstdis: '1000', seconddis: '2000', selected: false },
    { dis: '2000-4000 cc', firstdis: '2000', seconddis: '4000', selected: false },
    { dis: '4000-7000 cc', firstdis: '4000', seconddis: '7000', selected: false },
  ]

  EmissionNorms = [
    { emission: 'BS4', selected: false }, { emission: 'BS5', selected: false },
    { emission: 'BS6', selected: false }, { emission: 'BS7', selected: false },
  ]
  Airbag = [
    { name: 'Yes', selected: false }, { name: 'No', selected: false }
  ]


  constructor(private router: Router, private activatedroute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private globalservice: GlobalService) {
    //this.name = `Angular! v${VERSION.full}`;
  }

  ngOnInit(): void {
    this.loader = true;
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardata = JSON.parse(params['data']);
        console.log("Car data is", this.cardata);
      });




    // this.getcarsbyvariantsmatch();

    //here we add local storage condition

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('userinfo') != null) {
        //login info decryption
        var encryptSecretKey = "aaaaa";
        var getlocaldata = localStorage.getItem("userinfo")


        this.userInfo = CryptoJS.AES.decrypt(getlocaldata, encryptSecretKey);
        this.getUser = JSON.parse(this.userInfo.toString(CryptoJS.enc.Utf8));

        console.log("userinfodecrypt data SC", this.getUser);
        this.localregisterno = this.getUser["mobilenumber"]


        //this.username=this.getuserdatadecrypt;
        console.log("this.getuserdatadecrypt SC", this.getUser)

        console.log("this.getuserdatadecrypt SC", this.getUser["name"]);
        this.userName = this.getUser["name"];


      } else {
        console.log("user not login ")

      }
    }


    if (this.cardata.length === 0 || this.cardata === 'undefined') {
      console.log("disable button serach car");
      console.log("get user value", this.getUser["name"], this.cardata.length);
      document.getElementById('dropdownMenuButtonSortBy').setAttribute("disabled", null);
    } else {
      console.log("enable button serach car");
      console.log("get user value", this.getUser["name"], this.cardata.length);
      document.getElementById('dropdownMenuButtonSortBy').removeAttribute("disabled");
    }

    this.getAllBrands();

  }

  getAllBrands() {
    let url = this.globalservice.base_path_api() + 'cars/allbrands';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.carsbrand = rsp.data;
      // this.carsbrand.selected = false;
      // var brandname = {};
      // rsp.data.filter(b => {
      //   brandname['name'] = b._id;
      //   brandname['selected'] = false;
      //   console.log("brand name data", brandname);
      //   this.carsbrand.push(brandname);
      console.log("brand name data array priyanka", this.carsbrand);
      // });
    })
  }
  // Getting Selected Games and Count
  getSelected() {
    // console.log("hi.......")
    this.selected_carbrand = this.carsbrand.filter(s => {
      return s.selected;
    });
    this.selected_carbudget = this.car_budget.filter(s => {
      return s.selected;
    });
    this.selected_carvehicle = this.VehicleType.filter(s => {
      return s.selected;
    });
    this.selected_carfuel = this.FuelType.filter(s => {
      return s.selected;
    });
    this.selected_cartransmission = this.Transmission.filter(s => {
      return s.selected;
    });
    this.selected_carSeats = this.SeatingCapacity.filter(s => {
      return s.selected;
    });
    this.selected_carMileage = this.Mileage.filter(s => {
      return s.selected;
    });
    this.selected_carEngiDis = this.EngineDisplacement.filter(s => {
      return s.selected;
    });
    this.selected_Airbag = this.Airbag.filter(s => {
      return s.selected;
    });
    this.selected_carEmission = this.EmissionNorms.filter(s => {
      return s.selected;
    });
    // this.selected_count = this.selected_cars.length;
    console.log("selected checkbox", this.selected_carbrand, this.selected_carbudget, this.selected_carvehicle,
      this.selected_carfuel, this.selected_cartransmission, this.selected_carSeats, this.selected_carMileage,
      this.selected_Airbag, this.selected_carEngiDis, this.selected_carEmission);
    this.FilterAll();
    // this.getcarsbyvariantsmatch();
    //alert(this.selected_games);    
  }


  //Clearing All Selections
  clearSelection() {
    this.searchText = "";
    this.carsbrand = this.carsbrand.filter(c => {
      c.selected = false;
      return true;
    });
    this.getSelected();
  }


  // //Clear term types by user
  clearFilter() {
    this.searchText = "";

  }

  FilterAll() {
    this.loader = true;
    this.selected_carbrand.filter(s => {
      this.selected_carbrand._id = s._id
      this.carbrandname.push(this.selected_carbrand._id);
      console.log(this.carbrandname);
    });
    this.selected_carbudget.filter(s => {
      this.selected_carbudget.firstprice = s.firstprice,
        this.selected_carbudget.secondprice = s.secondprice
    });
    this.selected_carvehicle.filter(s => {
      this.selected_carvehicle.name = s.name
      this.carvehiclename.push(this.selected_carvehicle.name);
      console.log(this.carvehiclename);
    });
    this.selected_carfuel.filter(s => {
      this.selected_carfuel.name = s.name
    });
    this.selected_carSeats.filter(s => {
      this.selected_carSeats.seats = s.seats
    });
    this.selected_cartransmission.filter(s => {
      this.selected_cartransmission.name = s.name
    });
    this.selected_carEmission.filter(s => {
      this.selected_carEmission.emission = s.emission
    });
    this.selected_Airbag.filter(s => {
      this.selected_Airbag.name = s.name
    });
    this.selected_carMileage.filter(s => {
      this.selected_carMileage.firstmail = s.firstmail,
        this.selected_carMileage.secondmail = s.secondmail
    });
    this.selected_carEngiDis.filter(s => {
      this.selected_carEngiDis.firstdis = s.firstdis,
        this.selected_carEngiDis.seconddis = s.seconddis
    });
    let url = this.globalservice.base_path_api() + 'cars/filteralldata';
    const body = {
      brand: this.selected_carbrand._id,
      factors_body_type: this.selected_carvehicle.name,
      capacities_seating_capacity: this.selected_carSeats.seats,
      transmission: this.selected_cartransmission.name,
      safety_features_airbag: this.selected_Airbag.name,
      factors_emission_standard: this.selected_carEmission.emission,
      fuel_type: this.selected_carfuel.name,
      price_sSvalue: this.selected_carbudget.firstprice,
      price_sEvalue: this.selected_carbudget.secondprice,
      mileage_start: this.selected_carMileage.firstmail,
      mileage_end: this.selected_carMileage.secondmail,
      fdcc_start: this.selected_carEngiDis.firstdis,
      fdcc_end: this.selected_carEngiDis.seconddis
    }

    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      this.loader = false;
      var filterdata = rsp.data;
      this.cardata = filterdata;
      console.log(" filter array res", this.cardata);
      // this.getcarsbyvariantsmatch();
    })
  }


  Viewcardetails(c) {
    console.log("details", c);
    console.log("id car", c.car_id);

    let url = this.globalservice.base_path_api() + 'cars/carid';
    const body = {
      car_id: c.car_id
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log("data", rsp.data);
      this.carOffers = rsp.data;
      console.log("array res", this.carOffers);
      this.router.navigate(['/cardetails'],
        { queryParams: { data: JSON.stringify(this.carOffers) } }
      );
    })
  }

  // commented by priyanka because of some issue 8 june 2022
  // getcarsbyvariantsmatch() {
  //   for (let i = 0; i < this.cardata.length; i++) {
  //     this.cardata.filter(s => {
  //       this.cardata.model = s.model
  //       console.log("model match", this.cardata.model);
  //     });
  //     const body = {
  //       model: this.cardata.model,
  //     }
  //     let url = this.globalservice.base_path_api() + 'cars/matchcriteriadata';
  //     this.globalservice.PostRequest(url, body).subscribe(rsp => {
  //       var matchdata = rsp.data;
  //       this.Matchcardata = matchdata;
  //       // console.log(" Matchcars array res", this.Matchcardata);
  //     })
  //   }
  // }
  // end

  // onItemChange(event) {
  //   let val = event.target.value
  //   console.log("gddsfj" + val)
  //   if (val == "1-5") {
  //     this.minPrice = 100000;
  //     this.maxPrice = 500000;
  //     console.log(this.minPrice)
  //     console.log(this.maxPrice);

  //   } else if (val == "5-10") {
  //     this.minPrice = 500000;
  //     this.maxPrice = 100000;
  //   } else if (val == "10-15") {
  //     this.minPrice = 100000;
  //     this.maxPrice = 150000;
  //   } else if (val == "15-20") {
  //     this.minPrice = 150000;
  //     this.maxPrice = 200000;
  //   }
  // }



  viewOffers(data) {
    console.log("View offers click");
    console.log("Hi vishal from serach car component", data);

    const body = {
      register_no: this.localregisterno,
      carno: data
    }
    let url = this.globalservice.base_path_api() + 'user/useraddcars';
    // let url = 'http://localhost:3000/api/v1/user/useraddcars';
    this.http.post<any>(url, body).subscribe(rsp => {
      console.log(" response in backend data vishal", rsp);


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


  //car model name get by A TO Z
  fmodelAtoZ() {
    console.log("model A to Z call");
    this.ModelAtoZ = this.cardata.sort((a, b) => (a.model > b.model) ? 1 : -1)
    console.log("Model A To Z", this.ModelAtoZ);
  }

  //car model name get by Z to A
  fmodelZtoA() {
    console.log("model Z to A call");
    this.ModelZtoA = this.cardata.sort((a, b) => (a.model < b.model) ? 1 : -1)
    console.log("Model Z To A", this.ModelAtoZ);
  }

  //car price high to low
  fpriceHightoLow() {
    console.log("Get price high to low");
    this.priceHighToLow = this.cardata.sort((a, b) => (a.price < b.price) ? 1 : -1)
    console.log("Model A To Z", this.priceHighToLow);
  }

  fpriceLowtoHigh() {
    console.log("Get price low to high");
    this.priceLowToHigh = this.cardata.sort((a, b) => (a.price > b.price) ? 1 : -1)
    console.log("Model Z To A", this.priceLowToHigh);
  }

  getCarVarients(value: any) {
    const body = {
      model: value,
    }
    let url = this.globalservice.base_path_api() + 'cars/matchcriteriadata';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      let Varients = rsp.data.filter(r => {
        // if(r.varient=='-'){
        //   r.pop();
        // }
        return r.varient && r.varient !== "-";
      })
      this.varientsData = Varients;
      console.log(" varientsData array res 7 varients", this.varientsData);
    })

  }


  // priyanka 1 july 2022
  getvarientsdata(b) {
    this.Selectedvarientsdata.unshift(b);
    this.isVarientdata = false;
    console.log("varients data ", b, this.Selectedvarientsdata);
  }
  // end
  // ClickedRow(index:any){
  //   console.log("index of selected varient",index);
  //   // this.expandedIndex = index === this.expandedIndex ? -1 : index;
  //   if(index=0){
  //     document.getElementById("vBtnV").setAttribute("aria-expanded", "true"); 
  //     document.getElementById("vBtnV").setAttribute("class", "accordion-toggle dropdown w-100 dropBtnMiddle"); 
  //     document.getElementById("collapseOne").setAttribute("class", "panel-collapse in collapse show"); 
  //   }
  //   else{
  //     document.getElementById("vBtnV").setAttribute("aria-expanded", "false"); 
  //     document.getElementById("vBtnV").setAttribute("class", "accordion-toggle dropdown w-100 dropBtnMiddle collapsed"); 
  //     document.getElementById("collapseOne").setAttribute("class", "panel-collapse in collapse"); 
  //   }
  // }


  // getOptionValue(value: string){
  //   console.log("get selected option",value);
  //   var stringOne = value.split(",");
  //   var StringOneSub=stringOne[0]
  //   var stringTwo=StringOneSub.split("(")
  //   var stringBrandV=stringTwo[0]
  //   console.log("stringOne--->",stringBrandV);

  //   var priceOne=value.split("₹ ")
  //   var priceOneSub=priceOne[1]
  //   var priceTwo=priceOneSub.split(",")
  //   var priceTwoSub="₹ "+priceTwo[0]
  //   console.log("price one here----->",priceTwoSub);

  //   var varientPrint={
  //     varient:stringBrandV,
  //     price_print:priceTwoSub
  //   }

  //   console.log("here we get obj",varientPrint);

  //   const body = {
  //     price_print: priceTwoSub,
  //     varient:stringBrandV
  //   }
  //   let urlvpp = this.globalservice.base_path_api() + 'cars/getcarobject';
  //   this.globalservice.PostRequest(urlvpp, body).subscribe(rsp => {
  //     this.varientsData = rsp.data;
  //     console.log("here we get car object--->", this.varientsData);
  //   })
  // }








}

