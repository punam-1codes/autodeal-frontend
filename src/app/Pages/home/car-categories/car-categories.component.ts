import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ViewChild, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../services/global.service';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import SwiperCore, {Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual,Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-car-categories',
  templateUrl: './car-categories.component.html',
  styleUrls: ['./car-categories.component.scss']
})
export class CarCategoriesComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
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

  car_category: any = [];
  // colors:any=[];
  cardetails: any = [];
  category = 'MUV';
  loader: boolean = false;
  carcategorydata: any = [];
  constructor(private http: HttpClient, private globalservice: GlobalService, private router: Router) {


  }

  ngOnInit(): void {
    this.getcarbybrands();
  }

  getcarbybrands() {
    this.loader = true;
    let url = this.globalservice.base_path_api() + 'cars/allCarCategories';
    const body = {
      factors_body_type: this.category,
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log("data", rsp.data);
      this.loader = false;
      this.car_category = rsp.data;
      // this.tabGroup.selectedIndex = 1;
      console.log("array res car_category", this.car_category);
    })
  }

  onTabClick(event) {
    this.category = event.tab.textLabel;
    console.log("Click Category ", this.category);
    this.getcarbybrands();
    // this.tabGroup.selectedIndex = 1;
  }

  // onSwiper([swiper]) {
  //   console.log(swiper);
  // }
  onSlideChange() {
    console.log('slide change');
  }
  
  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }

  Viewcardetails(c) {
    console.log("details", c);
    console.log("id car", c.car_id);

    let url = this.globalservice.base_path_api() + 'cars/carid';
    const body = {
      car_id: c.car_id
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log("data", rsp.data);
      this.cardetails = rsp.data;
      console.log("array res", this.cardetails);
      this.router.navigate(['/cardetails'],
        { queryParams: { data: JSON.stringify(this.cardetails) } }
      );
    })
  }

  getbycategory(category) {
    this.loader = true;
    let url = this.globalservice.base_path_api() + 'cars/allCarCategories';
    const body = {
      factors_body_type: category,
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      var filterdata = rsp.data;
      this.carcategorydata = filterdata;
      console.log(" filter array res", this.carcategorydata);
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.carcategorydata) } }
      )
    })
  }

}
