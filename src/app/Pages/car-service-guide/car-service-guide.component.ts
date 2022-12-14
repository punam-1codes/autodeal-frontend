import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import { SwiperComponent } from "swiper/angular";
import { GlobalService } from '../../../app/services/global.service';

@Component({
  selector: 'app-car-service-guide',
  templateUrl: './car-service-guide.component.html',
  styleUrls: ['./car-service-guide.component.scss']
})
export class CarServiceGuideComponent implements OnInit {
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
  cars: any = [];
  cardata: any = [];
  colors: any = [];
  loader: boolean = false;
  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService,) { }

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
          this.cardata.brand = cardata.brand;
          cardata.colors.forEach(color => {
            this.colors.push(color);
          })
        });
      });
    this.getBrands();
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
