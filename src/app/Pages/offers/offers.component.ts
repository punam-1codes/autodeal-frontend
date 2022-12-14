import { Component, OnInit ,ViewChild} from '@angular/core';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  Offers:any=[];
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
  constructor() { }

  ngOnInit(): void {
    this.Offers = [
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
      { img: 'assets/Images/offer2.PNG', title: 'Health Insurance', offer: 'Compare & save Big* on Family Health Insurance', btntitle: 'Health Insurance Plans For Family' },
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
      { img: 'assets/Images/offer2.PNG', title: 'Health Insurance', offer: 'Compare & save Big* on Family Health Insurance', btntitle: 'Health Insurance Plans For Family' },
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
    ]
  }

}
