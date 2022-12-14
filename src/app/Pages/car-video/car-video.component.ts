import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import { SwiperComponent } from "swiper/angular";

@Component({
  selector: 'app-car-video',
  templateUrl: './car-video.component.html',
  styleUrls: ['./car-video.component.scss']
})
export class CarVideoComponent implements OnInit {
  UpNextCars: any = [];
  p: number = 1;
  caroptions: any = [];
  Offers: any = [];
  IndiaAutoPorta: any = [];
  CarVideo: any = [];
  cardata: any = [];
  colors: any = [];
  loader: boolean = false;
  budgetdata: any = [];
  car_category: any = [];
  Mileagedata: any = [];
  Automaticcars:any=[];
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
  configCarVideo: SwiperOptions = {
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

  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService, public router: Router) { }

  ngOnInit(): void {
    this.loader = true;
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardata=JSON.parse(params['data']);
        console.log("Car data is", this.cardata);
        this.cardata.forEach(cardata => {
          this.cardata.mileage_print = cardata.mileage_print;
          this.cardata.engine = cardata.engine;
          this.cardata.transmission = cardata.transmission;
          this.cardata.capacities_seating_capacity = cardata.capacities_seating_capacity;
          this.cardata.model = cardata.model;
          cardata.colors.forEach(color => {
            this.colors.push(color);
          })
        });
      });

    this.caroptions = [
      { img: "assets/Images/car5.jpg", title: 'Hatchback Cars', category: 'Hatchback', code: "1" },
      { img: "assets/Images/car6.jpg", title: 'Cars Between 3 to 6 Lakh', firstprice: '03.00', secondprice: '06.00', code: "2" },
      // { img: "assets/Images/car7.jpg", title: 'Upcoming Hatchback Cars' },
      { img: "assets/Images/car8.jpg", title: 'Best Mileage Cars', mileage_start: '20', mileage_end: '50', code: "3" },
      { img: "assets/Images/car4.jpg", title: 'Automatic Cars', transmission: 'Automatic', code: "4" },
    ]

    this.UpNextCars = [
      { img: 'assets/Images/car3.jpg', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', publisher: 'Auto Deal', views: '323535', time: '30 Days ago' },
      { img: 'assets/Images/car3.jpg', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', publisher: 'Auto Deal', views: '323535', time: '30 Days ago' },
      { img: 'assets/Images/car3.jpg', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', publisher: 'Auto Deal', views: '323535', time: '30 Days ago' },
      { img: 'assets/Images/car3.jpg', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', publisher: 'Auto Deal', views: '323535', time: '30 Days ago' },
      { img: 'assets/Images/car3.jpg', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', publisher: 'Auto Deal', views: '323535', time: '30 Days ago' },
      { img: 'assets/Images/car3.jpg', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', publisher: 'Auto Deal', views: '323535', time: '30 Days ago' },
    ]

    this.CarVideo = [
      { url: 'assets/carvideo.mp4', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', subtitle: 'Maruti Has Sold More Than 25 Lakh Swifts In India!' },
      { url: 'assets/carvideo.mp4', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', subtitle: 'Maruti Has Sold More Than 25 Lakh Swifts In India!' },
      { url: 'assets/carvideo.mp4', title: 'Maruti Has Sold More Than 25 Lakh Swifts In India!', subtitle: 'Maruti Has Sold More Than 25 Lakh Swifts In India!' },
    ]

    this.IndiaAutoPorta = [
      { icon: 'fas fa-globe' },
      { icon: 'fas fa-car' },
      { icon: 'fas fa-tag' },
      { icon: 'fas fa-car' },
    ]
  }

  MoreCarOption(c) {
    console.log(c);
    if (c.code == "1") {
      let url = this.globalservice.base_path_api() + 'cars/car/categories/' + c.category;
      this.globalservice.PostRequest(url, {}).subscribe(rsp => {
        console.log("data", rsp.data);
        this.car_category = rsp.data;
        console.log("array res", this.car_category);
        this.router.navigate(['/searchcars'],
          { queryParams: { data: JSON.stringify(this.car_category) } }
        );
      })
    }
    if (c.code == "2") {
      let url = this.globalservice.base_path_api() + 'cars/car';
      this.globalservice.PostRequest(url + "/" + c.firstprice + "/" + c.secondprice, {}).subscribe(res => {
        this.budgetdata = res.data
        console.log("budget data", this.budgetdata);
        this.router.navigate(['/searchcars'],
          { queryParams: { data: JSON.stringify(this.budgetdata) } }
        );
      })
    }
    if (c.code == "3") {
      let url = this.globalservice.base_path_api() + 'cars/filteralldata';
      const body = {
        mileage_start: c.mileage_start,
        mileage_end: c.mileage_end,
      }
      this.globalservice.PostRequest(url, body).subscribe(rsp => {
        this.loader = false;
        var filterdata = rsp.data;
        this.Mileagedata = filterdata;
        console.log(" array res", this.Mileagedata);
        this.router.navigate(['/searchcars'],
          { queryParams: { data: JSON.stringify(this.Mileagedata) } }
        )
      })
    }

    if (c.code == "4") {
      let url = this.globalservice.base_path_api() + 'cars/filteralldata';
      const body = {
        transmission: c.transmission,
      }
      this.globalservice.PostRequest(url, body).subscribe(rsp => {
        this.loader = false;
        var filterdata = rsp.data;
        this.Automaticcars = filterdata;
        console.log(" array res", this.Automaticcars);
        this.router.navigate(['/searchcars'],
          { queryParams: { data: JSON.stringify(this.Automaticcars) } }
        )
      })
    }
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
