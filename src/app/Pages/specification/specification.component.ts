import { Component, OnInit, ViewChild } from '@angular/core';
// import { BannerComponent } from '../banner/banner.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})
export class SpecificationComponent implements OnInit {
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
  slideimage: any = ['1', '2', '3', '4', '5']
  car_comparison: any = [];
  cardata: any = [];
  colors: any = [];
  loader: boolean = false;
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

  slideConfigOAS = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false, "infinite": true,
    cssEase: 'linear',
    variableWidth: true,
    variableHeight: true,
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

  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService,private router:Router) { }

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
    this.getallcomparedcars();
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


  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }


  clickSellCar(){
    console.log("sell car click");
    this.router.navigate(['/sellcar'])
  }

  goTOSelectModals(){
    // console.log("go to navigate selectmoddals call");
    
    this.router.navigate(["/Selectmodals"])
  }

}
