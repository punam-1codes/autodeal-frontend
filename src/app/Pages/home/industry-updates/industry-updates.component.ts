import { Component, OnInit,ViewChild} from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { DomSanitizer } from '@angular/platform-browser';
import SwiperCore, {Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual,Navigation, Pagination, Scrollbar, A11y]);
import {Router} from '@angular/router';

@Component({
  selector: 'app-industry-updates',
  templateUrl: './industry-updates.component.html',
  styleUrls: ['./industry-updates.component.scss']
})

export class IndustryUpdatesComponent implements OnInit {
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false, infinite: true,
    // centerMode: true,
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
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
      }
    }

  };
  CarNews: any = [];
  CarReview: any = [];
  CarVideo: any = [];


  constructor(private globalservice: GlobalService, private sanitizer: DomSanitizer,public router:Router) { }

  ngOnInit(): void {
    this.getCarNews();
    this.getCarReviews();
    this.getCarVideo();
  }

  

  trimString(string, length) {
    return string?.length > length ?
      string.substring(0, length) + '...' :
      string;
  }

  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  getCarNews() {
    let url = this.globalservice.base_path_api() + 'car-news/getnews';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.CarNews = rsp.data;
      console.log("Car News Industry Updates...", this.CarNews);

    })
  }
  getCarReviews() {
    let url = this.globalservice.base_path_api() + 'car-exreview/getexpertreview';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.CarReview = rsp.data;
      console.log("Car Review Industry Updates...", this.CarReview);

    })
  }

  getCarVideo() {
    let url = this.globalservice.base_path_api() + 'car-video/getcarvideo';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.CarVideo = rsp.data;
      console.log("Car Video Industry Updates...", this.CarVideo);

    })
  }

  newsdetails(c){
    console.log("news details",c)
    this.router.navigate(['/newsdetails'],
    { queryParams: { newsdata: JSON.stringify(c) } }
  )
  }

  // transform() {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.CarVideo.car_videos_link);
  // }

}
