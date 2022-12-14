import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import { SwiperComponent } from "swiper/angular";
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.scss']
})
export class CarImagesComponent implements OnInit {
  cardata: any = [];
  slideimage: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  configCarImages: SwiperOptions = {
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
    // scrollbar: { draggable: true },
    navigation: true,
    // autoplay:true
  };


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

  config1: SwiperOptions = {
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
        slidesPerView: 3,
      }
    }

  };


  Offers: any = [];
  carnews: any = [];
  cars: any = [];
  carImage: any
  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService) {
    this.carnews = this.carnews.map(item => ({
      ...item,
      showMore: false,
    }));
  }

  ngOnInit(): void {
    this.activatedroute.queryParams
      .subscribe(params => {
        // this.loader = false;
        this.cardata = JSON.parse(params['data']);
        console.log("Car data is", this.cardata);
        this.cardata.forEach(cardata => {
          this.cardata.brand = cardata.brand;
        });
      });

    this.getBrands();
    // this.cars = [
    //   { img: "assets/Images/car5.jpg", title: 'Maruti Suzuki Baleno', price: 'Rs.5.85 - 8.67 Lakh', address: 'Ex-showroom,Delhi' },
    //   { img: "assets/Images/car5.jpg", title: 'Maruti Suzuki Baleno', price: 'Rs.5.85 - 8.67 Lakh', address: 'Ex-showroom,Delhi' },
    //   { img: "assets/Images/car5.jpg", title: 'Maruti Suzuki Baleno', price: 'Rs.5.85 - 8.67 Lakh', address: 'Ex-showroom,Delhi' },
    //   { img: "assets/Images/car5.jpg", title: 'Maruti Suzuki Baleno', price: 'Rs.5.85 - 8.67 Lakh', address: 'Ex-showroom,Delhi' },
    //   { img: "assets/Images/car5.jpg", title: 'Maruti Suzuki Baleno', price: 'Rs.5.85 - 8.67 Lakh', address: 'Ex-showroom,Delhi' },
    // ]
    this.Offers = [
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
      { img: 'assets/Images/offer2.PNG', title: 'Health Insurance', offer: 'Compare & save Big* on Family Health Insurance', btntitle: 'Health Insurance Plans For Family' },
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
      { img: 'assets/Images/offer2.PNG', title: 'Health Insurance', offer: 'Compare & save Big* on Family Health Insurance', btntitle: 'Health Insurance Plans For Family' },
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
    ]

    this.carnews = [
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "11 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "12 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "13 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
    ]

  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '..........' :
      string;
  }

  onSlideChange() {
    console.log('slide change');
  }

  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  getBrands() {
    console.log(this.cardata.brand);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + this.cardata.brand;
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.cars = rsp.data;
      console.log("brand data", this.cars);
    })
  }


}
