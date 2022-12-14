import { Component, OnInit } from '@angular/core';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import { SwiperComponent } from "swiper/angular";
import { GlobalService } from '../../../services/global.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-service-info',
  templateUrl: './car-service-info.component.html',
  styleUrls: ['./car-service-info.component.scss']
})
export class CarServiceInfoComponent implements OnInit {
  car_review=4;
  Mileage:any=[];
  cars:any=[]
  carnews:any=[];
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

  loader: boolean = false;
  cardetailsCS:any=[];


  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService) {
  }

  ngOnInit(): void {
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardetailsCS=JSON.parse(params['data']);
        console.log("Car data is model and fule type", this.cardetailsCS);
      });

    
   
this.cars=[
  {path:'assets/Images/car3.jpg',model:'Audi',price:'₹ 28.95_Lakh'},
  {path:'assets/Images/car4.jpg',model:'Hyundai',price:'₹ 30.9_Lakh'},
  {path:'assets/Images/car5.jpg',model:'BMW',price:'₹ 50.00_Lakh'},
  {path:'assets/Images/car6.jpg',model:'Jeep',price:'₹ 13.45_Lakh'},
  {path:'assets/Images/car7.jpg',model:'Maruti',price:'₹ 60.25_Lakh'},

]

this.carnews = [
  { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "11 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india" },
  { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "12 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
  { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "13 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
]

    this.Mileage = [
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
  }
  
  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '..........' :
      string;
  }
  
  onSlideChange() {
    console.log('slide change');
  }
}
