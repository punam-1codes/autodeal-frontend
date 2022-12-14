import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserReviewModalComponent } from '../Modals/user-review-modal/user-review-modal.component';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {
  viewAllContaint: boolean = false;
  rating=4;
  isViewMore = true;
  isReadMore = true;
  public bsModalRef: BsModalRef;
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
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


 

  car_comparison: any = [];

  car_offers: any = [];

  userReviews: any = [
    // { heading: "Alto 800 JUN 2022 NEW VEHICLE", date: "5 months ago", cr_star: "4", publisher: "Auto Deal", description: "about swift, I bought my swift Vxi in 2019. Great value for money and fun to drive.<br> Engine refinement is too good. Service maintenance is good. In 2.6 years, I spend only 8k over the entire service" },
    // { heading: "Alto 800 JUN 2023 NEW VEHICLE", date: "6 months ago", cr_star: "4", publisher: "Auto Deal", description: "about swift, I bought my swift Vxi in 2019. Great value for money and fun to drive.<br> Engine refinement is too good. Service maintenance is good. In 2.6 years, I spend only 8k over the entire service" },
    // { heading: "Alto 800 JUN 2024 NEW VEHICLE", date: "7 months ago", cr_star: "4", publisher: "Auto Deal", description: "about swift, I bought my swift Vxi in 2019. Great value for money and fun to drive.<br> Engine refinement is too good. Service maintenance is good. In 2.6 years, I spend only 8k over the entire service" },
  ]

  SimilarReview = [
    { img: "assets/Images/car8.jpg"},
    { img: "assets/Images/car5.jpg"},
    { img: "assets/Images/car6.jpg"},
    { img: "assets/Images/car7.jpg"},
    { img: "assets/Images/car8.jpg"},
    ]

  newstopic: any = [
    { Nimg: "https://images.unsplash.com/photo-1619767885690-a287d2acebc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3dpZnQlMjBjYXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60", Nheading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", Npublisher: "Auto Deal", Ntime: "11 Hours ago", Ndescription: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
    { Nimg: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Ym13JTIwY2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", Nheading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", Npublisher: "Auto Deal", Ntime: "12 Hours ago", Ndescription: "The Swift, which was first launched in 2005, is in its third generation in india" },
    { Nimg: "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", Nheading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", Npublisher: "Auto Deal", Ntime: "13 Hours ago", Ndescription: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
  ]
  cardata: any = [];
  colors: any = [];
  loader: boolean = false;
  constructor(private activatedroute: ActivatedRoute, private router: Router,
    private globalservice: GlobalService, public modalService: BsModalService) {
    this.getUserReviews();

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
          this.cardata.price = cardata.price;
          this.cardata.brand = cardata.brand;
          this.cardata.bodytype = cardata.factors_body_type;
          cardata.colors.forEach(color => {
            this.colors.push(color);
          })
        });
      });

    this.car_offers = [
      { img: "", offername: "CAR INSURANCE", offertext: "Save upto 75% on car Insurance policy", btntext: "Get Car Insurance Policy" },
      { img: "", offername: "HEALTH INSURANCE", offertext: "Compare $ Save Big on Family health Insurance", btntext: "Health Insurance Plans For family" },
      { img: "", offername: "CAR INSURANCE", offertext: "Save upto 75% on car Insurance policy", btntext: "Get Car Insurance Policy" },
    ]

    this.getUserReviews();
    this.getallcomparedcars();
  }

  show() {
    this.viewAllContaint == false ? this.viewAllContaint = true : this.viewAllContaint = false;
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '..........' :
      string;
  }

  AddUserReview(cardata) {
    this.bsModalRef = this.modalService.show(UserReviewModalComponent, {
      animated: true,
      // initialState: this.cardata,
      backdrop: 'static',
      class: 'modal-md',
    });
    localStorage.setItem('Modaldata', JSON.stringify(cardata));
    this.bsModalRef.content.event.subscribe(res => {
      this.userReviews.push(res.data);
    });
  }




  getUserReviews() {
    let url = this.globalservice.base_path_api() + 'car-userreview/getuserreviews';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.userReviews = rsp.data;
      console.log("Car Review Reviews...", this.userReviews);
    })
  }

  getallcomparedcars() {
    let url = this.globalservice.base_path_api() + 'cars/comparebtypeprice';
    this.globalservice.PostRequest(url + "/" + this.cardata.bodytype + "/" + this.cardata.price, {}).subscribe(rsp => {
      this.loader = false;
      var varientdata = rsp.data;
      this.car_comparison = varientdata;
      console.log(" compared cars res", this.car_comparison);
    })

  }

}
