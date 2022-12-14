import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

//for api call
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../app/services/global.service';
//2nd value
import { Router, ActivatedRoute } from '@angular/router';


//add swiperjs

import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.scss']
})
export class EmiCalculatorComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  configOneEC: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
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

  configTwoReviewsEC: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
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
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
      }
    }

  };


  configThreeBrandsEC: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 6,
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
    // breakpoints: {
    //   500: {
    //     slidesPerView: 2,
    //   },
    //   700: {
    //     slidesPerView: 3,
    //   },
    //   // when window width is >= 1024px
    //   1024: {
    //     slidesPerView: 4,
    //   }
    // }

  };


  priceTab:any = '1-5 LAKH';

  //here we create array for years
  dataTagListSorted = [12, 24, 36, 48, 60, 72, 84, 96]

  amount = 0;
  payableAmount = 0;
  interest: any;
  rate: number;
  months: number = 12;
  total: number;
  searchValueNo: number;
  downPayNo: number = 100000
  loanValueNo: number = 0;
  payExtra: any = 0;

  //api call varibale 
  car_brands: any = [];
  brand_name: any = [];
  selectedBrand: string;
  selectedModel: string;
  selectedVarient: string;

  car_varients: any = []
  varient_name: any = []

  final_car: any;
  car_get: any = [];
  //6th here we set default value of car price , here we get all value we want , but when user click on new data then they not get new car value price emi
  car_price: any = 4;

  loader: boolean = false;
  cardata: any = [];
  secondValue: any;
  selectedOwnValue: any;
  selectedOldBrand: any = "Select Brand";
  selectedOldModel: any = "Select Model";
  selectedOldVariant: any = "Select Varient";

  //get car byt budget 01-07-2022
  car_budgetECEC: any = []
  budgetdataCarData: any = []
  start_value: any;
  end_value: any;

  //top brands 02-07
  allBrandPicturesEC: any = [
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

  branddataEC: any;

  //car review
  car_reviewEC: any = [];

  //here we add 20-09-2022
  extrapayableamount:any;
  carextrapayvalue:any;
  positivetotalvalue:any;
  //add 21-09-2022
  ifElseEmiValue:any;
  ifElseEmiValuePositive:any;
  

  //emi after rate value 
  afterrate:any=0.005485

  extraNoValue:Number;

  //new value for display 25-11-2022
  newEmiAmount:any;
  newPayableAmount:any;
  newExtraPayAmount:any;

  //add in contructor
  constructor(private http: HttpClient, private globalservice: GlobalService, private activatedroute: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    // this.getallmodels()
    // this.getallVarient()
    // this.getselectedCar()

    //get all car by budget
    this.gtePriceOfCar();
    //get customer reviews
    this.getAllCarReviewsEC()

    //2value 
    this.loader = true;
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardata.push(JSON.parse(params['data']));
        console.log("Car data is", this.cardata);

      });

    //5th here try to set car_price, we not get value because of all function call inside selectvarient() , so here we only call on function
    // this.getNewCarPrice()



    this.valueGetCall();

    this.getselectedCar();


    this.car_budgetECEC = [
      { price: "1-5 LAKH", firstprice: '01.00', secondprice: '05.00' },
      { price: "5-10 LAKH", firstprice: '05.00', secondprice: '10.00' },
      { price: "10-15 LAKH", firstprice: '10.00', secondprice: '15.00' },
      { price: "15-20 LAKH", firstprice: '15.00', secondprice: '20.00' },
      { price: "20-35 LAKH", firstprice: '20.00', secondprice: '35.00' },
      { price: "35-50 LAKH", firstprice: '35.00', secondprice: '50.00' },
      { price: "50-100 LAKH", firstprice: '50.00', secondprice: '100.00' },
      // { price: "30-40 LAKH", firstprice: '30.00', secondprice: '40.00' },
      // { price: "40-50 LAKH", firstprice: '40.00', secondprice: '50.00' },
      // { price: "60-80 LAKH", firstprice: '60.00', secondprice: '80.00' },
      // { price: "90 LAKH-1 CRORE", firstprice: '90.00', secondprice: '100.00' },
      // { price: "1 CRORE+", firstprice: '100.00', secondprice: '9900.00' }
    ]
  }




  getallmodels() {
    //7th here we have to empty cardata value 
    this.cardata = []
    console.log("***get all models function call", this.cardata);

    this.downPayNo = 0;
    this.interest = 0;
    this.months = 12;
    this.loanValueNo = 0;
    this.payableAmount = 0;
    this.payExtra = 0;
    this.total = 0;
    this.amount = 0;

    console.log("here selected value indis edfe", this.selectedBrand)

    let url = this.globalservice.base_path_api() + 'cars/getbranddetails';
    this.globalservice.PostRequest(url, { brand: this.selectedBrand || "Hyundai" }).subscribe(rsp => {
      console.log(" 1st car_brand data getallmodels", rsp.data);
      this.car_brands = rsp.data;
      // this.brand_name=rsp.data[0].brand;
      // console.log("brand name",this.brand_name);
      console.log("2nd car_brand array res getallmodels", this.car_brands);
    })




  }

  getallVarient() {
    //8th here we have to empty cardata value 
    this.cardata = []
    console.log("******get all varient function call", this.cardata);



    console.log("selected model", this.selectedModel);

    let url = this.globalservice.base_path_api() + 'cars/getallvarients';
    this.globalservice.PostRequest(url, { model: this.selectedModel || "Hyundai Santro" }).subscribe(rsp => {
      console.log(" 1st car_brand data getallVarient", rsp.data);
      this.car_varients = rsp.data;
      // this.varient_name=rsp.data[0].model;
      // console.log("brand name",this.varient_name);
      console.log("2nd car_brand array res getallVarient", this.car_varients);
    })

  }

  // getNewCarPrice(){
  //   if(this.cardata){
  //     this.car_price=this.secondValue
  //   }else{
  //     this.car_price=this.selectedOwnValue
  //   }
  // }

  getselectedCar() {
    console.log("************get selected car function call", this.cardata);

    console.log("Selected varient selectedBrand", this.selectedBrand);
    console.log("Selected varient selectedModel", this.selectedModel);
    console.log("Selected varient selectedVarient", this.selectedVarient);

    const body = {
      brand: this.selectedBrand,
      model: this.selectedModel,
      varient: this.selectedVarient
    }

    let url = this.globalservice.base_path_api() + 'cars/getselectedcar';
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log(" 1st car_brand data getselectedCar", rsp.data);
      this.final_car = rsp.data;
      //4th here we declaire new variable 
      // this.selectedOwnValue=rsp.data[0].price
      //1st we have to change car price with default one
      //3rd condition here we add if condition
      if (this.cardata) {
        if (this.selectedVarient) {
          this.car_price = rsp.data[0].price
          console.log("car_price seleted###", this.car_price);
        } else {
          this.car_price = this.secondValue
          console.log("car_price not selected#####", this.car_price);
        }
      } else {
        this.car_price = rsp.data[0].price
        console.log("car_price seleted###", this.car_price);
      }

      // console.log("car_price",this.car_price);

      console.log("2nd car_brand array res getselectedCar", this.final_car);

      if (this.car_price % 1 != 0) {
        this.payableAmount = this.car_price * 100000;
        console.log("this payable amount in lakh", this.payableAmount);
        this.amount = this.payableAmount - 30000

      }
      else {
        this.payableAmount = this.car_price * 100000;
        //2nd then we get this else value and may be if value  
        console.log("this payable amount in crore", this.payableAmount);
        this.amount = this.payableAmount - 30000
      }
    })


  }





  logos: OwlOptions = {
    loop: true,
    nav: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
  }

  review: OwlOptions = {
    loop: true,
    nav: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
  }


  //here we add function
  onDownpayChange(downpayValue) {
    console.log("downpayment", downpayValue);
    this.downPayNo = Number(downpayValue)
    console.log("downpayment in number", this.downPayNo);
    this.onSearchChange(8)

  }


  onSearchChange(searchValue) {
    console.log("value get ", typeof (searchValue));
    this.searchValueNo = Number(searchValue)
    console.log(" rate in number ", this.searchValueNo);
    console.log("payamount in number", this.payableAmount);
    // console.log("get data witi 30000 min",this.payableAmount-30000);
    this.extrapayableamount=this.payableAmount-30000
    console.log("payable amount ---------------------->",this.extrapayableamount);
    
    
    console.log("month in number", this.months);
    console.log("Downpayment in number", this.payableAmount,this.downPayNo);
    console.log("loan value", this.payableAmount - this.downPayNo);
    this.loanValueNo = this.payableAmount - this.downPayNo

    console.log("1st value", this.loanValueNo);
    console.log("2nd value", this.months);
    console.log("3rd value", this.total);



    // this.payExtra=this.loanValueNo-(this.months*this.total)
    // console.log("Extra pay money",this.payExtra);



    if (this.downPayNo != 100000) {
      console.log("IF PART CALL NOWWWWWWWWWWWWWWWWWWWWWWWWWW");
      
      console.log("amount value",this.loanValueNo,"rate value",this.searchValueNo,"months value",this.months,"after rate value",this.afterrate);
      //this.afterrate = 0.01 22-09-2022
      this.interest = (this.loanValueNo * (this.searchValueNo * this.afterrate)) / this.months;
      console.log("interest abc downpayment", this.interest);

      this.total = ((this.loanValueNo / this.months) + this.interest).toFixed(2) - 8992;
      console.log("EMI VALUE IS abc downpayment", this.total);

      // var bbvalue=(this.loanValueNo * (this.searchValueNo * this.afterrate)) / this.months;
      // console.log("bbvalue +++++++++++++",bbvalue);
      // var ccvalue=((this.loanValueNo/this.months)+bbvalue)
      // console.log("ccvalue +++++++++++++",ccvalue);
      

      //add 21-09-2022
      console.log("IF PART CALL EMI loadvalueno",this.loanValueNo,"this month",this.months,"this interest",this.interest);
      
      this.ifElseEmiValue=((this.loanValueNo / this.months) + this.interest).toFixed(2)
      console.log("If Get OG real value ----------------------------------------------------->",this.ifElseEmiValue);
      this.ifElseEmiValuePositive=Math.abs(this.ifElseEmiValue)
      console.log("If Get OG real value -----------------------------------------------------Positive--->",this.ifElseEmiValuePositive);
      

      //here we add 20-09-2022
      this.positivetotalvalue=Math.abs(this.total)
      console.log("if total price ------------>",this.positivetotalvalue);
      

      this.payExtra = ((this.months * this.total) - this.loanValueNo).toFixed(2)
      console.log("Extra pay money", this.payExtra);

      
      //here we add 20-09-2022
      this.carextrapayvalue=Math.abs(this.payExtra)
      console.log("if car extra pay value-------------------------->",this.carextrapayvalue);
      

      let valueInNumber=Math.abs(this.payExtra)
      console.log("if value In Number",valueInNumber);
      
      // this.extrapayableamount=this.extrapayableamount + valueInNumber
      // console.log("if 2nd value get -------------------------------->",this.extrapayableamount);

      if(this.payExtra.length<=8){
        console.log("iF get type of EXTRA PAY IF",typeof(this.payExtra));
        this.payExtra.substring(0,4)
        
        console.log("iF get starting 4 digit IF",this.payExtra);        
        this.extraNoValue=Math.abs(this.payExtra)
        console.log("iF extraNo Value",typeof(this.extraNoValue));
      }else{
        console.log("ELSE get type of EXTRA PAY IF",typeof(this.payExtra));
        this.payExtra.substring(0,10)
        console.log("ELSE get starting 4 digit IF",this.payExtra);  
        this.extraNoValue=Math.abs(this.payExtra)
        console.log("ELSE extraNo Value IF",typeof(this.extraNoValue));    
      }
      console.log("loan value no IFFFFFF",this.loanValueNo,"extra no value",this.extraNoValue);
      
      this.extrapayableamount=this.loanValueNo + Number(this.extraNoValue)
      console.log("else 2nd value get IF-------------------------------->",this.extrapayableamount);

      //code rewrite IF
      //payable amount and extra pay amount
      console.log("IF emi value--->",this.ifElseEmiValuePositive);

      //switch case for months
      switch(this.months){
        case(this.months=12):
        this.newPayableAmount=12 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 12 ",this.newPayableAmount);
        console.log("loan amount ============",this.loanValueNo);
        
        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 12",this.newExtraPayAmount);
        
        break;
        case(this.months=24):
        this.newPayableAmount=24 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 24 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 24",this.newExtraPayAmount);
        
        break;
        case(this.months=36):
        this.newPayableAmount=36 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 36",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 36",this.newExtraPayAmount);

        break;
        case(this.months=48):
        this.newPayableAmount=48 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 48",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 48",this.newExtraPayAmount);

        break;
        case(this.months=60):
        this.newPayableAmount=60 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 60 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 60",this.newExtraPayAmount);

        break;
        case(this.months=72):
        this.newPayableAmount=72 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 72 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 72",this.newExtraPayAmount);

        break;
        case(this.months=84):
        this.newPayableAmount=84 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 84 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 84",this.newExtraPayAmount);

        break;
        case(this.months=96):
        this.newPayableAmount=96 * this.ifElseEmiValuePositive
        console.log("IF New PAYABLEAMOUNT VALUE 96 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("IF New Extra Pay 96",this.newExtraPayAmount);

        break;
        default:
          this.newPayableAmount=12 * this.ifElseEmiValuePositive
          console.log("IF New PAYABLEAMOUNT VALUE 12 DEfault ",this.newPayableAmount);

          this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
          console.log("IF New Extra Pay 12 default",this.newExtraPayAmount);

          break;
  
      }
      
      
    }
    else {
      console.log("ELSE PART CALL NOWWWWWWWWWWWWWWWWWWWWWWWWWW");
      //this.afterrate = 0.01 22-09-2022
      console.log("else PART 1 payable amount",this.payableAmount,"serach value no",this.searchValueNo,"this afterrate",this.afterrate,"months",this.months);
      
      this.interest = (this.payableAmount * (this.searchValueNo * this.afterrate)) / this.months;
      console.log("interest abc not downpayment", this.interest);

      console.log("else PART 2 ",this.payableAmount,"months value",this.months,"this interest",this.interest); 

      this.total = ((this.payableAmount / this.months) + this.interest).toFixed(2) - 8992;
      console.log("EMI VALUE IS abc not downpayment", this.total);

      //add 21-09-2022
      console.log("ELSE PART CALL EMI payableamount",this.payableAmount,"this month",this.months,"this interest",this.interest);
      this.ifElseEmiValue=((this.payableAmount / this.months) + this.interest).toFixed(2)
      console.log("Else emi OG value ------------------------------------------------------>",this.ifElseEmiValue);
      this.ifElseEmiValuePositive=Math.abs(this.ifElseEmiValue)
      console.log("Else Get OG real value -----------------------------------------------------Positive--->",this.ifElseEmiValuePositive);
      
      
      //here we add 20-09-2022
      this.positivetotalvalue=Math.abs(this.total)
      console.log("else total price ------------>",this.positivetotalvalue);
      console.log("Else PART 3 this month",this.months,"total price",this.total,"this loan amount",this.loanValueNo);
      this.payExtra = Number((this.months * this.total) - this.loanValueNo).toFixed(2)
      console.log("Extra pay money", this.payExtra);

      //here we add 20-09-2022
      this.carextrapayvalue=Math.abs(this.payExtra)
      console.log("else car extra pay value-------------------------->",this.carextrapayvalue);

      let valueInNumber=Math.abs(this.payExtra)
      console.log("else value In Number",valueInNumber);
      console.log("Else PART 4 extrapayableamount",this.extrapayableamount,"payextra",valueInNumber);
      
      // this.extrapayableamount=this.extrapayableamount + valueInNumber
      // console.log("else 2nd value get -------------------------------->",this.extrapayableamount);

      if(this.payExtra.length<=8){
        console.log("iF get type of EXTRA PAY",typeof(this.payExtra));
        this.payExtra.substring(0,4)
        
        console.log("iF get starting 4 digit",this.payExtra);        
        this.extraNoValue=Math.abs(this.payExtra)
        console.log("iF extraNo Value",typeof(this.extraNoValue));
      }else{
        console.log("ELSE get type of EXTRA PAY",typeof(this.payExtra));
        this.payExtra.substring(0,10)
        console.log("ELSE get starting 4 digit",this.payExtra);  
        this.extraNoValue=Math.abs(this.payExtra)
        console.log("ELSE extraNo Value",typeof(this.extraNoValue));    
      }

      this.extrapayableamount=this.loanValueNo + Number(this.extraNoValue)
      console.log("else 2nd value get -------------------------------->",this.extrapayableamount);


      //code rewrite ELSE
      //payable amount and extra pay amount
      console.log("ELSE emi value--->",this.ifElseEmiValuePositive);


      switch(this.months){
        case(this.months=12):
        this.newPayableAmount=12 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 12 ",this.newPayableAmount);
        // console.log("loan amount ============",this.loanValueNo);
        
        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 12",this.newExtraPayAmount);

        break;
        case(this.months=24):
        this.newPayableAmount=24 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 24 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 24",this.newExtraPayAmount);

        break;
        case(this.months=36):
        this.newPayableAmount=36 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 36",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 36",this.newExtraPayAmount);

        break;
        case(this.months=48):
        this.newPayableAmount=48 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 48",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 48",this.newExtraPayAmount);

        break;
        case(this.months=60):
        this.newPayableAmount=60 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 60 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 60",this.newExtraPayAmount);

        break;
        case(this.months=72):
        this.newPayableAmount=72 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 72 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 72",this.newExtraPayAmount);

        break;
        case(this.months=84):
        this.newPayableAmount=84 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 84 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 84",this.newExtraPayAmount);

        break;
        case(this.months=96):
        this.newPayableAmount=96 * this.ifElseEmiValuePositive
        console.log("ELSE New PAYABLEAMOUNT VALUE 96 ",this.newPayableAmount);

        this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
        console.log("ELSE New Extra Pay 96",this.newExtraPayAmount);

        break;
        default:
          this.newPayableAmount=12 * this.ifElseEmiValuePositive
          console.log("ELSE New PAYABLEAMOUNT VALUE 12 DEfault ",this.newPayableAmount);

          this.newExtraPayAmount=this.newPayableAmount - this.loanValueNo
          console.log("ELSE New Extra Pay 12 default",this.newExtraPayAmount);

          break;
  
      }
      
      
    }





    // this.interest = (this.amount  * (this.searchValueNo * 0.01)) / this.months;
    // console.log("interest abc",this.interest);

    // this.total = ((this.amount / this.months) + this.interest).toFixed(2);
    // console.log("EMI VALUE IS abc",this.total);

    this.searchValueNo = this.rate

  }


  getValue(x: any, index: any) {
    console.log("selected value", x, "index of value", index);
    this.months = x
    console.log("months value", this.months);
    let aRate=this.months
    console.log("aRate value ---------->",aRate);
    switch(aRate){
      case(aRate=12):
      this.afterrate=0.005485
      console.log("afterrate value is",this.afterrate);
      break;
      case(aRate=24):
      this.afterrate=0.0107
      console.log("afterrate value is",this.afterrate);
      break;
      case(aRate=36):
      this.afterrate=0.016
      console.log("afterrate value is",this.afterrate);
      break;
      case(aRate=48):
      this.afterrate=0.0215
      console.log("afterrate value is",this.afterrate);
      break;
      case(aRate=60):
      this.afterrate=0.0271
      console.log("afterrate value is",this.afterrate);
      break;
      case(aRate=72):
      this.afterrate=0.0328
      console.log("afterrate value is",this.afterrate);
      break;
      case(aRate=84):
      this.afterrate=0.0386
      console.log("afterrate value is",this.afterrate);
      break;
      case(aRate=96):
      this.afterrate=0.0447
      console.log("afterrate value is",this.afterrate);
      break;
      default:
        this.afterrate=0.005485
        console.log("default value selected",this.afterrate);
        break;

    }



    console.log(" rate in number ", this.searchValueNo);
    console.log("payamount in number", this.payableAmount);

    console.log("month in number", this.months);

    this.onSearchChange(8)

    // this.payExtra=((this.months*this.total)-this.loanValueNo).toFixed(2)
    // console.log("Extra pay money",this.payExtra);



    // this.interest = (this.amount * (this.rate * 0.01)) / this.months;
    // console.log("interest xyz",this.interest);

    // this.total = ((this.amount / this.months) + this.interest).toFixed(2);
    // console.log("EMI VALUE IS xyz",this.total);

  }


  valueGetCall() {
    console.log("this.card emi-calculator -- change dropdrop name 1", this.cardata);
    this.secondValue = this.cardata[0][0].price
    this.selectedOldBrand = this.cardata[0][0].brand
    this.selectedOldModel = this.cardata[0][0].model
    this.selectedOldVariant = this.cardata[0][0].varient
    console.log("here we get price emi-calculator -- change dropdrop name 2", this.secondValue, this.selectedOldBrand, this.selectedOldModel, this.selectedOldVariant);

  }

  onTabClick(event) {
    this.priceTab = event.tab.textLabel;
    console.log("Click Category ", this.priceTab);
    this.gtePriceOfCar();
  }

  gtePriceOfCar() {
    if (this.priceTab == "1-5 LAKH") {
      this.car_budgetECEC.firstprice = '01.00'; this.car_budgetECEC.secondprice = '05.00';
      console.log(this.car_budgetECEC.firstprice,this.car_budgetECEC.secondprice);
    } else if (this.priceTab == "5-10 LAKH") {
      this.car_budgetECEC.firstprice = '05.00'; this.car_budgetECEC.secondprice = '10.00';
    } else if (this.priceTab == "10-15 LAKH") {
      this.car_budgetECEC.firstprice = '10.00'; this.car_budgetECEC.secondprice = '15.00';
    } else if (this.priceTab == "15-20 LAKH") {
      this.car_budgetECEC.firstprice = '15.00'; this.car_budgetECEC.secondprice = '20.00';
    } else if (this.priceTab == "20-35 LAKH") {
      this.car_budgetECEC.firstprice = '20.00'; this.car_budgetECEC.secondprice = '35.00';
    } else if (this.priceTab == "35-50 LAKH") {
      this.car_budgetECEC.firstprice = '35.00'; this.car_budgetECEC.secondprice = '50.00';
    } else if (this.priceTab == "50-100 LAKH") {
      this.car_budgetECEC.firstprice = '50.00'; this.car_budgetECEC.secondprice = '100.00';
    }
    let url = this.globalservice.base_path_api() + 'cars/allcarsbyprice';
    const body = {
      b_start: Number(this.car_budgetECEC.firstprice),
      b_end: Number(this.car_budgetECEC.secondprice)
    }
    this.globalservice.PostRequest(url, body).subscribe(res => {
      this.budgetdataCarData = res.data
      console.log("budget data in EMI calculator component", this.budgetdataCarData);
      // this.router.navigate(['/searchcars'],
      //   { queryParams: { data: JSON.stringify(this.budgetdataCarData) } }
      // );
    })
  }


  trimString(string: any, length: any) {
    return string?.length > length ?
      string.substring(0, length) + '...' :
      string;
  }


  //search top brands
  onBrandClickEC(e: any) {
    console.log("bi data is here", e);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + e.brand;
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.branddataEC = rsp.data;
      console.log("brand data", this.branddataEC);
      //here we change searchcars to brand-details
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.branddataEC) } }
      );
    })
  }


  //car reviews
  getAllCarReviewsEC() {
    let url = this.globalservice.base_path_api() + 'c-review/getallcreview';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      console.log("data", rsp.data);
      this.car_reviewEC = rsp.data;
      console.log("array review res", this.car_reviewEC);

    })
  }







}
