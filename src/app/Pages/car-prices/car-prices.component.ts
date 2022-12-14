import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CarServiceGuideComponent } from '../car-service-guide/car-service-guide.component';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-car-prices',
  templateUrl: './car-prices.component.html',
  styleUrls: ['./car-prices.component.scss']
})
export class CarPricesComponent implements OnInit {
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



  carnews: any = [];
  cars: any = [];
  cardata: any = [];
  colors: any = [];
  loader: boolean = false;
  Allvrients: any = [];
  PetrolVersion: any = [];
  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService,
    public modalService: BsModalService) { }

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

    this.carnews = [
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "11 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "12 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "13 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
    ]
    this.getallvarients();
    this.getallcomparedcars();
  }
  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '..........' :
      string;
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
    })

  }

  public showModal(data: any): void {
    const initialState = {
      config: {
        title: "Users Infomation",
        save: "Save",
        cancel: "Cancel"
      },
      userInfo: {
        username: 'DaiDH',
        password: 'Admin',
      }
    };
    this.bsModalRef = this.modalService.show(CarServiceGuideComponent, {
      // initialState,
      animated: true,
      backdrop: 'static',
      class: 'modal-md'
    });
  }

  getallcomparedcars() {
    let url = this.globalservice.base_path_api() + 'cars/comparebtypeprice';
    this.globalservice.PostRequest(url + "/" + this.cardata.bodytype + "/" + this.cardata.price, {}).subscribe(rsp => {
      this.loader = false;
      var varientdata = rsp.data;
      this.cars = varientdata;
      console.log(" compared cars res------------------------------------------------------------------------------->", this.cars);
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

}
