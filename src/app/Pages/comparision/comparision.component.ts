import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.scss']
})
export class ComparisionComponent implements OnInit {
  cardata: any = [];
  loader: boolean = false;
  comparedata: any = [];
  car_comparison:any=[];
  uploadedImg = ''
  fileToUpload: any;
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
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.uploadedImg = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

  }

  constructor(private activatedroute: ActivatedRoute,private globalservice: GlobalService,) { }

  ngOnInit(): void {
    this.loader = true;
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardata.push(JSON.parse(params['cardata']));
        console.log("Car data is", this.cardata);
        this.cardata.forEach(cardata => {
          this.cardata.price = cardata.price;
          this.cardata.bodytype=cardata.factors_body_type;
          this.cardata.brand=cardata.brand;
          console.log("body type",this.cardata.bodytype);
         });
        this.comparedata.push(JSON.parse(params['comparedata']));
        console.log("compare data is", this.comparedata);
      });

      this.getallcomparedcars();
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
}
