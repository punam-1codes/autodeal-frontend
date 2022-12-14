import { Component, OnInit, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {SellerDetailsComponent } from "../seller-details/seller-details.component";

@Component({
  selector: 'app-used-car-details',
  templateUrl: './used-car-details.component.html',
  styleUrls: ['./used-car-details.component.scss']
})
export class UsedCarDetailsComponent implements OnInit {
  public bsModalRef: BsModalRef;
  // loan amount slider
  LoanAmount: FormControl = new FormControl(15000);
  options: Options = {
    floor: 5000,
    ceil: 25000,
    showSelectionBar: true
  };
  // end
  // loan amount slider
  LoanTerm: FormControl = new FormControl(5);
  optionsTerm: Options = {
    floor: 3,
    ceil: 6,
    showSelectionBar: true
  };
  // end
  p: number = 1;
  UsedCars: any = [];
  CarImages: any = [{ img: 'assets/nios.jpg ' }, { img: 'assets/swift.png ' }, { img: 'assets/santro.jpg' },];
  Vehicle_Summary: any = [];
  Vehicle_Details: any = [];
  carnews: any = [];
  Usedcardata: any = [];
  MostViewedUsedCars: any = [];
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 100,
    effect: "fade",
    loop: true,
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: true,
  };

  config1: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 100,
    effect: "fade",
    loop: true,
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
  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService,
    private router: Router,public modalService: BsModalService) {
    this.carnews = this.carnews.map(item => ({
      ...item,
      showMore: false,
    }));
  }

  ngOnInit(): void {
    this.GetMostViewedUsedCars();
    this.activatedroute.queryParams
      .subscribe(params => {
        this.Usedcardata = JSON.parse(params['data']);
        console.log("Used Car data is", this.Usedcardata);
        this.Usedcardata.forEach(u => {
          this.Usedcardata.year = u.year;
          this.Usedcardata.kd_Done = u.kd_Done;
          this.Usedcardata.gear = u.gear;
          this.Usedcardata.fueltype = u.fueltype;
          this.Usedcardata.engine = u.engine;
          this.Usedcardata.owner = u.owner;
          this.Usedcardata.color = u.color;
          this.Usedcardata.city = u.city;
          this.Usedcardata.registration_no = u.registration_no;
          this.Usedcardata.registration_at = u.registration_at;
          this.Usedcardata.life_time_tax = u.life_time_tax;
          this.Usedcardata.car_insurance = u.car_insurance;
          this.Usedcardata.insurance_valid_till = u.insurance_valid_till;
          this.Usedcardata.estimated_price = u.estimated_price;
          this.Usedcardata.is_car_accidental = u.is_car_accidental;
          this.Usedcardata.is_car_flood_affected = u.is_car_flood_affected;
        });
      });

    this.UsedCars = [
      { img: "assets/Images/car5.jpg", model: 'Maruti Swift' },
      { img: "assets/Images/car6.jpg", model: 'Tata' },
      { img: "assets/Images/car4.jpg", model: 'Hyundai' },
      { img: "assets/Images/car8.jpg", model: 'Honda' },
      { img: "assets/Images/car5.jpg", model: 'Maruti Swift' },
      { img: "assets/Images/car6.jpg", model: 'Tata' },
    ]

 

    this.carnews = [
      { img: "assets/Images/car5.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "11 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car6.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "12 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "13 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
    ]

  }

  ngDoCheck(){
    this.Vehicle_Summary = [
      { img: 'assets/Vehicle/Year.PNG', title: 'Year', data: this.Usedcardata.year },
      { img: 'assets/Vehicle/kilometer.PNG', title: 'Kilometer', data: this.Usedcardata.kd_Done },
      { img: 'assets/Vehicle/Gear.PNG', title: 'Gear', data: this.Usedcardata.gear },
      { img: 'assets/Vehicle/Fuel.PNG', title: 'Fuel Type', data: this.Usedcardata.fueltype },
      { img: 'assets/Vehicle/Engine.PNG', title: 'Engine', data: this.Usedcardata.engine },
    ]

    this.Vehicle_Details = [
      { title: 'Owner*', data: this.Usedcardata.owner },
      { title: 'Colour', data: this.Usedcardata.color },
      { title: 'KM Done', data: this.Usedcardata.kd_Done },
      { title: 'City*', data: this.Usedcardata.city },
      { title: 'Registration No.', data: this.Usedcardata.registration_no },
      { title: 'Registration At', data: this.Usedcardata.registration_at },
      { title: 'Life Time Tax', data: this.Usedcardata.life_time_tax },
      { title: 'Car Insurance', data: this.Usedcardata.car_insurance },
      { title: 'Insurance Valid Till', data: this.Usedcardata.insurance_valid_till },
      { title: 'Estimated Price(₹)', data: this.Usedcardata.estimated_price },
      { title: 'Is car accidetal?', data: this.Usedcardata.is_car_accidental },
      { title: 'Is car flood-affected?', data: this.Usedcardata.is_car_flood_affected },
    ]

  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }

  GetMostViewedUsedCars() {
    let url = this.globalservice.base_path_api() + 'car-sale/getmostviewsellcar';
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.MostViewedUsedCars = rsp.data;
      console.log("usedcars array res", this.MostViewedUsedCars);
    })
  }

  SellerDetails(u) {
    console.log("Seller Details", u);
    // this.SellerDetail.push(u);
    const initialState = u;
    // this.modalRef = this.modalService.show(template, {initialState});
 
    this.bsModalRef = this.modalService.show(SellerDetailsComponent, {
      initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-lg',
    });
  }

  bannerclick(){
    console.log("Banner is clicked");
    
  }
 

}

