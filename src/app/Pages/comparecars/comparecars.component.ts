import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-comparecars',
  templateUrl: './comparecars.component.html',
  styleUrls: ['./comparecars.component.scss']
})
export class ComparecarsComponent implements OnInit {
  cardata: any = [];
  Comparedcars: any = []
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

  car_comparison: any = [];
  Offers: any = [];
  carnews: any = [];
  constructor(private activatedroute: ActivatedRoute, private globalservice: GlobalService,
    public router:Router) {
    this.carnews = this.carnews.map(item => ({
      ...item,
      showMore: false,
    }));
  }

  ngOnInit(): void {
    this.loader = true;
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardata=JSON.parse(params['data']);
        console.log("Car data is", this.cardata);
        this.cardata.forEach(cardata => {
         this.cardata.price = cardata.price;
         this.cardata.bodytype=cardata.factors_body_type;
         console.log("body type",this.cardata.bodytype);
         
        });
      });

    this.car_comparison = [
      // { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      // { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      // { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      // { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      // { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      // { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      // { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
    ]

    this.getallcomparedcars() ;

    this.Offers = [
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
      { img: 'assets/Images/offer2.PNG', title: 'Health Insurance', offer: 'Compare & save Big* on Family Health Insurance', btntitle: 'Health Insurance Plans For Family' },
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
      { img: 'assets/Images/offer2.PNG', title: 'Health Insurance', offer: 'Compare & save Big* on Family Health Insurance', btntitle: 'Health Insurance Plans For Family' },
      { img: 'assets/Images/offer1.PNG', title: 'Car Insurance', offer: 'Save upto 75% on car Insurance policy', btntitle: 'Get Car Insurance Policy' },
    ]

    this.carnews = [
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "11 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "12 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
      { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "13 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
    ]
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '..........' :
      string;
  }

  getallcomparedcars() {
    let url = this.globalservice.base_path_api() + 'cars/comparebtypeprice';
    this.globalservice.PostRequest(url + "/"+this.cardata.bodytype + "/"+ this.cardata.price,{}).subscribe(rsp => {
      this.loader = false;
      var varientdata = rsp.data;
      this.car_comparison = varientdata;
      console.log(" compared cars res", this.car_comparison);
    })

  }

  comparebothcars(cr,c){
    console.log("sgtrgrg");
    console.log("cardata",cr);
    console.log("comparedata",c);
    this.router.navigate(['/comparision'],
    { queryParams: { cardata: JSON.stringify(cr) , comparedata:JSON.stringify(c)} }
  );
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
