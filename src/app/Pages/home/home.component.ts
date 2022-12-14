import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);

import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  configMain: SwiperOptions = {
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
    scrollbar: { draggable: true },
    navigation: true,
    autoplay: true
  };
  configReview: SwiperOptions = {
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
      // when window width is >= 1024px
      900: {
        slidesPerView: 2,
      }
    }

  };
  budgetSelected: any
  vehicalTypeSelected: any;
  sliderImages: any = [];
  car_review: any = [];
  FindRightCar: any = [{ label: 'By Budget', isCheck: true }, { label: 'By Brand', isCheck: false }];
  car_budget: any = [];
  VehicleType: any = [];
  isBudget: boolean = true;
  isBrand: boolean = false;
  car_brand: any = [];
  budgetdata: any;
  brand = new FormControl();
  budget = new FormControl('Select Budget');
  vehicle_type = new FormControl('All Vehicle Type');
  branddata: any;
  slideConfig = {
    "slidesToShow": 2,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false, "infinite": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ]
  };

  // userinfodecryptGETHome:any;

  constructor(private globalservice: GlobalService, private router: Router) {
    // var encryptSecretKey = "aaaaa";
    // var getlocaldataofuser=localStorage.getItem("userinfo")
    // this.userinfodecryptGETHome = CryptoJS.AES.decrypt(getlocaldataofuser, encryptSecretKey);
    // console.log("userinfodecryptGETHome data home --------->",this.userinfodecryptGETHome[0]);
  }

  ngOnInit(): void {
    this.sliderImages = [
      { img: 'http://api.dealcars.in/homeImg/homeImg 1.jpg' },
      { img: 'http://api.dealcars.in/homeImg/homeImg 2.jpg' },
      { img: 'http://api.dealcars.in/homeImg/homeImg 3.jpg' },
      // {img:'http://api.dealcars.in/Ferrari/Ferrari F8 Tributo/Ferrari F8 Tributo 1.jpg'}
    ]
    //if we enter car-detail component then we push localstoarge then it present. that why we remove that local storage.
    localStorage.removeItem("userinfoCD");
    this.car_budget = [
      { price: 'Select Budget' },
      { price: "0-3 LAKH", firstprice: '00.00', secondprice: '03.00' },
      { price: "2-5 LAKH", firstprice: '02.00', secondprice: '05.00' },
      { price: "5-8 LAKH", firstprice: '05.00', secondprice: '08.00' },
      { price: "6-10 LAKH", firstprice: '06.00', secondprice: '10.00' },
      { price: "8-12 LAKH", firstprice: '08.00', secondprice: '12.00' },
      { price: "10-20 LAKH", firstprice: '10.00', secondprice: '20.00' },
      { price: "20-30 LAKH", firstprice: '20.00', secondprice: '30.00' },
      { price: "30-40 LAKH", firstprice: '30.00', secondprice: '40.00' },
      { price: "40-50 LAKH", firstprice: '40.00', secondprice: '50.00' },
      { price: "60-80 LAKH", firstprice: '60.00', secondprice: '80.00' },
      { price: "90 LAKH-1 CRORE", firstprice: '90.00', secondprice: '100.00' },
      { price: "1 CRORE+", firstprice: '100.00', secondprice: '9900.00' }
    ]

    this.VehicleType = [
      { label: 'All Vehicle Type' },
      { label: 'MUV' }, { label: 'SUV' }, { label: 'Roadster' },
      { label: 'Crossover' }, { label: 'Estate' }, { label: 'Coupe' },
      { label: 'Hatchback' }, { label: 'Sedan' }
    ]
    this.getAllCarReviews();
    this.getAllBrands();
  }


  getAllCarReviews() {
    let url = this.globalservice.base_path_api() + 'c-review/getallcreview';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      console.log("data", rsp.data);
      this.car_review = rsp.data;
      console.log("array review res", this.car_review);

    })
  }

  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  onselect(e) {
    console.log(e.target.value);
    if (e.target.value == "By Budget") {
      this.isBudget = true;
      this.isBrand = false;
    }
    if (e.target.value == "By Brand") {
      this.isBrand = true;
      this.isBudget = false;
    }
  }

  getAllBrands() {
    let url = this.globalservice.base_path_api() + 'cars/allbrands';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.car_brand = rsp.data;
      console.log("brand name data", this.car_brand);
    })
  }

  getBrands() {
    console.log(this.brand.value);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + this.brand.value;
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.branddata = rsp.data;
      console.log("brand data", this.branddata);
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.branddata) } }
      );
    })
  }

  getbybudget() {
    console.log("budget is", this.vehicle_type.value, this.budget.value);
    if (this.budget.value == "0-3 LAKH") {
      this.car_budget.firstprice = '00.00'; this.car_budget.secondprice = '03.00';
    } else if (this.budget.value == "2-5 LAKH") {
      this.car_budget.firstprice = '02.00'; this.car_budget.secondprice = '05.00';
    } else if (this.budget.value == "5-8 LAKH") {
      this.car_budget.firstprice = '05.00'; this.car_budget.secondprice = '08.00';
    } else if (this.budget.value == "6-10 LAKH") {
      this.car_budget.firstprice = '06.00'; this.car_budget.secondprice = '10.00';
    } else if (this.budget.value == "8-12 LAKH") {
      this.car_budget.firstprice = '08.00'; this.car_budget.secondprice = '12.00';
    } else if (this.budget.value == "10-20 LAKH") {
      this.car_budget.firstprice = '10.00'; this.car_budget.secondprice = '20.00';
    } else if (this.budget.value == "20-30 LAKH") {
      this.car_budget.firstprice = '20.00'; this.car_budget.secondprice = '30.00';
    } else if (this.budget.value == "30-40 LAKH") {
      this.car_budget.firstprice = '30.00'; this.car_budget.secondprice = '40.00';
    } else if (this.budget.value == "40-50 LAKH") {
      this.car_budget.firstprice = '40.00'; this.car_budget.secondprice = '50.00';
    } else if (this.budget.value == "60-80 LAKH") {
      this.car_budget.firstprice = '60.00'; this.car_budget.secondprice = '80.00';
    } else if (this.budget.value == "90 LAKH-1 CRORE") {
      this.car_budget.firstprice = '90.00'; this.car_budget.secondprice = '100.00';
    } else if (this.budget.value == "1 CRORE+") {
      this.car_budget.firstprice = '100.00'; this.car_budget.secondprice = '9900.00';
    }
    let url = this.globalservice.base_path_api() + 'cars/search-by';
    this.globalservice.PostRequest(url + "/" + this.car_budget.firstprice + "/" + this.car_budget.secondprice + "/" + this.vehicle_type.value, {})
      .subscribe(res => {
        this.budgetdata = res.data
        console.log("budget data", this.budgetdata);
        this.router.navigate(['/searchcars'],
          { queryParams: { data: JSON.stringify(this.budgetdata) } }
        );
      })
  }


  getBudgetValue(value: any) {
    // console.log("select call here",value);

    // budgetSelected:any
    // vehicalTypeSelected:any;
    this.budgetSelected = value;

    if (this.budgetSelected && this.vehicalTypeSelected) {
      // console.log("both value selected in budget",value);
      document.getElementById('searchBtn').removeAttribute("disabled");
    }
    else {
      console.log("both value not selected");
      document.getElementById('searchBtn').setAttribute("disabled", null);
    }


  }


  getVehicalTypeValue(value: any) {
    // console.log("select call here",value);
    this.vehicalTypeSelected = value
    if (this.budgetSelected && this.vehicalTypeSelected) {
      // console.log("both value selected in vehicaltype ",value);
      document.getElementById('searchBtn').removeAttribute("disabled");
    }
    else {
      // console.log("both value not selected");
      document.getElementById('searchBtn').setAttribute("disabled", null);
    }


  }

  GetAdvacedCars() {
    let url = this.globalservice.base_path_api() + 'cars/allcars';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      // this.CarVideo = rsp.data;
      this.budgetdata = rsp.data
      console.log("get all car data", this.budgetdata);
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.budgetdata) } }
      );
    })
  }

  getBrandTypeValue(value: any) {
    if (value) {
      // console.log("both value selected in vehicaltype ",value);
      document.getElementById('searchBtn2').removeAttribute("disabled");
    }
    else {
      // console.log("both value not selected");
      document.getElementById('searchBtn2').setAttribute("disabled", null);
    }



  }


  // openWhasappChart(){
  //   console.log("whatsapp link is click");
  //   var phoneNumber=9123456789
  //   window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}`)
  // }

  // openFCHWeb(){
  //   console.log("Open FCH Website");
  //   window.open(`https://familycarehospitals.com/`)
  // }





}
