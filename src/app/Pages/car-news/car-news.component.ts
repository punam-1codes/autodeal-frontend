import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-car-news',
  templateUrl: './car-news.component.html',
  styleUrls: ['./car-news.component.scss']
})
export class CarNewsComponent implements OnInit {
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
  budgetdata: any = [];
  car_category: any = [];
  Mileagedata: any = [];
  Automaticcars: any = [];
  caroptions: any = [];
  cardata: any = [];
  colors: any = [];
  loader: boolean = false;
  carnews: any = [];
  showall: boolean = false;
  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService,
    public router: Router) { }

  ngOnInit(): void {
    this.getCarNews();
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


    this.caroptions = [
      { img: "assets/Images/car5.jpg", title: 'Hatchback Cars', category: 'Hatchback', code: "1" },
      { img: "assets/Images/car6.jpg", title: 'Cars Between 3 to 6 Lakh', firstprice: '03.00', secondprice: '06.00', code: "2" },
      // { img: "assets/Images/car7.jpg", title: 'Upcoming Hatchback Cars' },
      { img: "assets/Images/car8.jpg", title: 'Best Mileage Cars', mileage_start: '20', mileage_end: '50', code: "3" },
      { img: "assets/Images/car4.jpg", title: 'Automatic Cars', transmission: 'Automatic', code: "4" },
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

  getCarNews() {
    let url = this.globalservice.base_path_api() + 'car-news/getnews';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.carnews = rsp.data;
      console.log("Car News Industry Updates...", this.carnews);

    })
  }

  newsdetails(c) {
    console.log("news details", c)
    this.router.navigate(['/newsdetails'],
      { queryParams: { newsdata: JSON.stringify(c) } }
    )
  }

}
