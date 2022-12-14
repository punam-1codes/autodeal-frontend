import { Component, OnInit } from '@angular/core';
import { Tile } from '@angular/material/grid-list/tile-coordinator';
import { Router } from '@angular/router';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-newsblog',
  templateUrl: './newsblog.component.html',
  styleUrls: ['./newsblog.component.scss']
})
export class NewsblogComponent implements OnInit {

  car_categoryPunam:any=[]
  loader: boolean = false;
  categoryPunam = 'MUV';
  carcategorydataPunam:any;


  configMain: SwiperOptions = {
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
    scrollbar: { draggable: true },
    navigation: false,
    autoplay: true
  };

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
    navigation: false,
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


  sliderImages: any = [];

  carimages: any = [];

  //  tiles: Tile[] = [
  //   {text: 'One', cols: 2, rows: 2,path:'assets/newsblogs/imgones.PNG', title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
  //   {text: 'Two', cols: 2, rows: 3, path:'assets/newsblogs/imgtwos.PNG' ,title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
  //   {text: 'Three', cols: 2, rows: 2,path:'assets/newsblogs/imgthrees.PNG' ,title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
  //   {text: 'Four', cols: 2, rows: 2,path:'assets/newsblogs/imgfours.PNG' ,title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
  //   {text: 'Six', cols: 2, rows: 2,path:'assets/newsblogs/imgsixs.PNG' ,title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
  //   {text: 'Five', cols: 2, rows: 3,path:'assets/newsblogs/imgfives.PNG' ,title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
   
  //   {text: 'Seven', cols: 2, rows: 2,path:'assets/newsblogs/imgsevens.PNG' ,title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
  //   {text: 'Eight', cols: 2, rows: 2,path:'assets/newsblogs/imgeights.PNG' ,title:'Lorem ipsum dolor sit amet, consectetur',description:'Sed ut perspiciaties unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab sed ut perspiciaties unde omnis iste natus error',credit:'Deal Cars'},
  
  // ];

  constructor(private globalservice: GlobalService, private router: Router) { }

  ngOnInit(): void {
    this.newFunction()

    this.sliderImages = [
      { path: 'assets/newsblogs/bannerone.PNG'}, 
      { path: 'assets/newsblogs/bannertwo.PNG'},
    ]

    this.carimages = [
      { path: 'assets/newsblogs/imgeight.PNG'}, 
      { path: 'assets/newsblogs/imgfive.PNG'},
      { path: 'assets/newsblogs/imgfour.PNG'}, 
      { path: 'assets/newsblogs/imgnine.PNG'},
      { path: 'assets/newsblogs/imgone.PNG'}, 
      { path: 'assets/newsblogs/imgseven.PNG'},
      { path: 'assets/newsblogs/imgsix.PNG'}, 
      { path: 'assets/newsblogs/imgten.PNG'},
      { path: 'assets/newsblogs/imgthree.PNG'}, 
      { path: 'assets/newsblogs/imgtwo.PNG'},
    ]
  }


  onTabClickPunam(event){
    console.log("function calll 1",event);
    this.categoryPunam = event.tab.textLabel;
    console.log("Click categoryPunam ", this.categoryPunam);
    
  }

  onSlideChangePunam(){
    console.log("function call 2 slide change");
    
  }

  ViewcardetailsPunam(event){
    console.log("function call 3",event);
    
  }

  getbycategory(event){
    console.log("function call 4",event);
    this.loader = true;
    let url = this.globalservice.base_path_api() + 'cars/allCarCategories';
    const body = {
      factors_body_type: this.categoryPunam,
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      var filterdata = rsp.data;
      this.carcategorydataPunam = filterdata;
      console.log(" filter array res", this.carcategorydataPunam);
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.carcategorydataPunam) } }
      )
    })
  }

  newFunction(){
    this.loader = true;
    let url = this.globalservice.base_path_api() + 'cars/allCarCategories';
    const body = {
      factors_body_type: this.categoryPunam,
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log("data", rsp.data);
      this.loader = false;
      this.car_categoryPunam = rsp.data;
      // this.tabGroup.selectedIndex = 1;
      console.log("array res car_categoryPunam", this.car_categoryPunam);
    })
  }

}
