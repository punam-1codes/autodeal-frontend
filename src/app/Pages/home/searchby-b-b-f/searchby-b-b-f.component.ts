import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import SwiperCore, {Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual,Navigation, Pagination, Scrollbar, A11y]);
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-searchby-b-b-f',
  templateUrl: './searchby-b-b-f.component.html',
  styleUrls: ['./searchby-b-b-f.component.scss']
})
export class SearchbyBBFComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  configbrand: SwiperOptions = {
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

  car_brands: any = [];
  car_budget: any = []
  Fuel: any = [];
  fueldata: any;
  branddata: any;
  budgetdata: any;
  constructor(public router: Router, private globalservice: GlobalService) { }

  ngOnInit(): void {

    // this.getCarBudget()

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

    this.car_budget = [
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

    this.Fuel = [
      { path: 'assets/Images/fuel1.PNG', name: 'Petrol' }, { path: 'assets/Images/fuel2.PNG', name: 'Diesel' },
      { path: 'assets/Images/fuel3.PNG', name: 'CNG' }, { path: 'assets/Images/fuel4.PNG', name: 'Electric' },
    ]
  }

  onFuelClick(e) {
    console.log(e);
    let url = this.globalservice.base_path_api() + 'cars/car/fuel/' + e.name;
    this.globalservice.GetRequest(url).subscribe(rsp => {
      this.fueldata = rsp.data;
      console.log(" fuel data", this.fueldata);
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.fueldata) } }
      );
    })

  }

  onBrandClick(e) {
    console.log(e);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + e.brand;
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.branddata = rsp.data;
      console.log("brand data", this.branddata);
      //here we change searchcars to brand-details
      this.router.navigate(['/brand-details'],
        { queryParams: { data: JSON.stringify(this.branddata) } }
      );
    })
  }

  onBudgetClick(e) {
    let url = this.globalservice.base_path_api() + 'cars/car';
    this.globalservice.PostRequest(url + "/" + e.firstprice + "/" + e.secondprice, {}).subscribe(res => {
      this.budgetdata = res.data
      console.log("budget data", this.budgetdata);
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.budgetdata) } }
      );
    })
  }


  //here we get car by budget
  // getCarBudget(){
  //   const a=200
  //   const b=400
  //   let url = this.globalservice.base_path_api() + 'cars/car';
  //   this.globalservice.postRequest(url+"/"+a+"/"+b, {}).subscribe(rbudget => {
  //     console.log("rbudget data", rbudget.data);
  //     this.carbudget=rbudget.data
  //     console.log("new in carbudget",this.carbudget);
      

  //   })

  // }




}
