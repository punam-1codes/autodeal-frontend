import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../app/services/global.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute } from '@angular/router';

//swiper

import SwiperCore, {Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual,Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit {


  
  configThreeBrandsBD: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 2,
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
        slidesPerView: 3,
      },
      700: {
        slidesPerView: 4,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 5,
      }
    }
  };

  car_brand: any = [];
  carslist:any=[];
  brand_name:any;
  selectedLevel:any;
  p:any;

  //searchbybrand
  loader: boolean = false;
  cardataByBrand: any = [];
  homeCarBrandName:any;
  branddatabd:any;
  
  starArray:any=[
    {startvalue:"4"},
  ]

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

  car_comparison: any = [];
  compare_cararray:any=[];
  start_price:any;
  compareStartValue:any;
  store_compareData:any= [];
  lgcar:any=[];
  finalarray:any=[]
  oneStoreData:any;
  cardetailsBD:any;
  //array of news to get selected brand news
  car_newsNS:any=[]
  brandNews:any;

  allBrandPictures:any=[
    { path: 'assets/brands/hyundai.PNG', brand: 'Hyundai' }, { path: 'assets/brands/isuzu.PNG', brand: 'Isuzu' },
    { path: 'assets/brands/jeep.PNG', brand: 'Jeep' }, { path: 'assets/brands/lambo.PNG', brand: 'Lamborghini' },
    { path: 'assets/brands/msuzuki.PNG', brand: 'Maruti' }, { path: 'assets/brands/tata.PNG', brand: 'Tata' },
    { path: 'assets/brands/toyota.PNG', brand: 'Toyota' }, { path: 'assets/brands/astron-martin.PNG', brand: 'Aston Martin' },
    { path: 'assets/brands/audi.PNG', brand: 'Audi' }, { path: 'assets/brands/honda.PNG', brand: 'Honda' },
    { path: 'assets/brands/bmw.PNG', brand: 'BMW' }, { path: 'assets/brands/bugatti.PNG', brand: 'Bugatti' },
    { path: 'assets/brands/citroen.PNG', brand: 'Citroen' }, { path: 'assets/brands/datsun.PNG', brand: 'Datsun' },
    { path: 'assets/brands/dc-design.PNG', brand: 'DC Design' }, { path: 'assets/brands/ferrari.PNG', brand: 'Ferrari' },
    { path: 'assets/brands/fiat.PNG', brand: 'Fiat' }, { path: 'assets/brands/force.PNG', brand: 'Force Motors' },
  ]
  


  constructor(private http: HttpClient, private globalservice: GlobalService,private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

  
    //for searchbybrand
    this.loader = true;
    this.activatedroute.queryParams
      .subscribe(params => {
        this.loader = false;
        this.cardataByBrand = JSON.parse(params['data']);
        console.log("Car data is", this.cardataByBrand[0].brand);
        this.homeCarBrandName=this.cardataByBrand[0].brand
        console.log("Get data by home page news--------------->",this.cardataByBrand[0].brand);
        this.brandNews=this.cardataByBrand[0].brand
        //get brand news by home component all data store in this.car_newsNS
        console.log("Get data by home page news---------------brandNews>",this.brandNews);
          let urlNS1 = this.globalservice.base_path_api() + 'car-news/getbrandnews/'+ this.brandNews;
          this.globalservice.postRequest(urlNS1, {}).subscribe(rsp => {
          console.log("data", rsp.data);
          this.car_newsNS = rsp.data;
          console.log("array review res brand deatils home page news----------> ", this.car_newsNS);

        })
        console.log("this homecarbrandname",this.homeCarBrandName);
        
      });

    // this.getNewsByBrand();

      

    this.getcarbybrands();

    

  }


  getcarbybrands() {
    // let url = this.globalservice.base_path_api() + 'cars/car/categories/' + this.category;
    console.log("here selected value indis edfe",this.selectedLevel)
    let url = this.globalservice.base_path_api() + 'cars/getbranddetails';
    this.globalservice.PostRequest(url, {brand:this.selectedLevel || this.homeCarBrandName }).subscribe(rsp => {
      console.log(" 1st car_brand data", rsp.data);
      this.car_brand = rsp.data;
      this.brand_name=rsp.data[0].brand;
      console.log("brand name",this.brand_name);
      console.log("2nd car_brand array res", this.car_brand);

      this.newCarModel()
     
      //get news of cars selected value all data present in this.car_newsNS
      console.log("brand name DropDown selected news----------------->",this.brand_name);
      this.brandNews=this.brand_name
      //because data load slow , we execute this api after get all model cars in car model 2022
      let urlNS1 = this.globalservice.base_path_api() + 'car-news/getbrandnews/'+this.brandNews;
      this.globalservice.postRequest(urlNS1, {}).subscribe(rsp => {
      console.log("data", rsp.data);
      this.car_newsNS = rsp.data;
      console.log("array review res brand deatils DropDown selected news---------->", this.car_newsNS);

    })


    })


  }


  newCarModel(){
    if(this.selectedLevel){
      this.carslist =[];
      console.log("we get selected  car brand name");
      let url2 = this.globalservice.base_path_api() + `cars/car/brands/${this.selectedLevel}`;
      
      this.globalservice.PostRequest(url2, {brand:this.selectedLevel || this.homeCarBrandName}).subscribe(rsp => {
      console.log("1st carslist  data", rsp.data);
      this.carslist = rsp.data;
      //add data in camparison array selected car
      this.car_comparison=rsp.data;
     
      this.start_price=rsp.data[0].price
      this.compareStartValue= Math.ceil( this.start_price ); 
      console.log("start price of selected brand",this.start_price);
      // console.log("compaire brand",this.compare_brand);

      //call compaire brand api for left side

      
      // this.brand_name=rsp.data[0].brand;
      // console.log("brand name",this.brand_name);
      console.log("2nd carslist array res", this.carslist);


      let url3=this.globalservice.base_path_api()+'cars/compare/'+this.compareStartValue;
      const body={
        // brand:this.compare_brand,
        price_sSvalue:this.start_price
      }
      console.log("body url 3 if ",body);
      this.globalservice.PostRequest(url3,body).subscribe(rsp=>{
        console.log("rsp from url3 if",rsp.data);
        //we remove 0 position data
        this.store_compareData=rsp.data
        console.log("this.store_compareData=rsp.data if",this.store_compareData);      
      })
      })


      



    }
    else{
      console.log("we get homesearch car brand name");
      this.carslist =[];
      let url2 = this.globalservice.base_path_api() + `cars/car/brands/${this.homeCarBrandName}`;
      
      this.globalservice.PostRequest(url2, {brand:this.selectedLevel || this.homeCarBrandName}).subscribe(rsp => {
      console.log("1st carslist  data", rsp.data);
      this.carslist = rsp.data;
      
      console.log("carlist data ------------------------->",this.carslist);
      
      //add data in camparison array selected car
      this.car_comparison=rsp.data;
      this.start_price=rsp.data[0].price
      this.compareStartValue= Math.ceil( this.start_price ); 
      console.log("start price of home page brand",this.start_price);
      // console.log("compaire brand",this.compare_brand);
      // this.brand_name=rsp.data[0].brand;
      // console.log("brand name",this.brand_name);
      console.log("2nd carslist array res", this.carslist);

      
      let url3=this.globalservice.base_path_api()+'cars/compare/'+this.compareStartValue;
      // const body={
      //   // brand:this.compare_brand,
      //   price_sSvalue:this.start_price
      // }
      console.log("body url 3 else");
      
      this.globalservice.PostRequest(url3,{}).subscribe(rsp=>{
        console.log("rsp from url3 else",rsp.data[0]);
        this.store_compareData=rsp.data
        console.log("this.store_compareData=rsp.data else--------------------->",this.store_compareData);
        
      })
      
      })


      // this.brandNews=this.brand_name
      // //get news of cars
      // let url = this.globalservice.base_path_api() + 'car-news/getbrandnews/'+this.brand_name;
      // this.globalservice.postRequest(url, {}).subscribe(rsp => {
      // console.log("data", rsp.data);
      // this.car_newsNS = rsp.data;
      // console.log("array review res brand deatils ELSE", this.car_newsNS);

      // })

     
    }



  }

  customOptions: OwlOptions = {
    loop: true,
    nav: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout:3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    
  }


  
  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }


  onBrandClick(e:any){
    console.log("bi data is here",e);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + e.brand;
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.branddatabd = rsp.data;
      console.log("brand data", this.branddatabd);
      //here we change searchcars to brand-details
      this.router.navigate(['/searchcars'],
        { queryParams: { data: JSON.stringify(this.branddatabd) } }
      );
    })
    
  }

  //function for compare cars in compare tab in cardetails
  comparebothcarsBD(cr,c){
    console.log("sgtrgrg");
    console.log("cardata",cr);
    console.log("comparedata",c);
    this.router.navigate(['/comparision'],
    { queryParams: { cardata: JSON.stringify(cr) , comparedata:JSON.stringify(c)} }
  );
  }



  ViewcardetailsBD(c) {
    console.log("details", c);
    console.log("id car", c.car_id);

    let url = this.globalservice.base_path_api() + 'cars/carid';
    const body = {
      car_id: c.car_id
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      console.log("data", rsp.data);
      this.cardetailsBD = rsp.data;
      console.log("array res", this.cardetailsBD);
      this.router.navigate(['/cardetails'],
        { queryParams: { data: JSON.stringify(this.cardetailsBD) } }
      );
    })
  }




  // getNewsByBrand(){
  //   let urlNS1 = this.globalservice.base_path_api() + 'car-news/getbrandnews/'+this.brandNews;
  //     this.globalservice.postRequest(urlNS1, {}).subscribe(rsp => {
  //     console.log("data", rsp.data);
  //     this.car_newsNS = rsp.data;
  //     console.log("array review res brand deatils home page news----------> ", this.car_newsNS);

  //     })
  // }


  trimString(string:any, length:any) {
    return string?.length > length ?
      string.substring(0, length) + '...' :
      string;
  }











}
