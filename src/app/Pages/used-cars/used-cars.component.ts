import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y]);
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-used-cars',
  templateUrl: './used-cars.component.html',
  styleUrls: ['./used-cars.component.scss']
})
export class UsedCarsComponent implements OnInit {
  searchText: string = "";
  loader: boolean = false;
  p: number = 1;
  UsedCars: any = [];
  CarReview: any = [];
  MostViewedUsedCars: any = [];
  UsedCarDetails: any = [];
  Brands: any = [];
  selected_carbrand: any = [];
  selected_carbrandModel: any = [];
  selected_Budget: any = [];
  selected_year: any = [];
  selected_kilometer: any = [];
  selected_fueltype: any = [];
  brandmodel: any = [];
  branddata: any = []
  // owner type
  owner: FormControl = new FormControl(null);
  options: Options = {
    floor: 1,
    ceil: 7,
    showSelectionBar: true
  };
  // end
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
  Reviewconfig: SwiperOptions = {
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

  car_budget = [
    { price: "0-3 LAKH", firstprice: 0, secondprice: 300000, id: 1, selected: false },
    { price: "2-5 LAKH", firstprice: 200000, secondprice: 500000, id: 2, selected: false },
    { price: "5-8 LAKH", firstprice: 500000, secondprice: 800000, id: 3, selected: false },
    { price: "6-10 LAKH", firstprice: 600000, secondprice: 1000000, id: 4, selected: false },
    { price: "8-12 LAKH", firstprice: 800000, secondprice: 1200000, id: 5, selected: false },
    { price: "10-20 LAKH", firstprice: 1000000, secondprice: 2000000, id: 6, selected: false },
    { price: "20-30 LAKH", firstprice: 2000000, secondprice: 3000000, id: 7, selected: false },
    { price: "30-40 LAKH", firstprice: 3000000, secondprice: 4000000, id: 8, selected: false },
    { price: "40-50 LAKH", firstprice: 4000000, secondprice: 5000000, id: 9, selected: false },
    { price: "60-80 LAKH", firstprice: 6000000, secondprice: 8000000, id: 10, selected: false },
    { price: "90 LAKH-1 CRORE", firstprice: 9000000, secondprice: 10000000, id: 11, selected: false },
    { price: "1 CRORE+", firstprice: 10000000, secondprice: 990000000, id: 12, selected: false }
  ]

  FuelType = [
    { name: 'Petrol', selected: false }, { name: 'Diesel', selected: false },
    { name: 'CNG', selected: false }, { name: 'Electric', selected: false },
  ]

  Kilometer = [
    { mail: '0-500 kmpl', firstmail: 0, secondmail: 500, selected: false },
    { mail: '500-800 kmpl', firstmail: 500, secondmail: 800, selected: false },
    { mail: '800-1200 kmpl', firstmail: 800, secondmail: 1200, selected: false },
    { mail: '1200-2000 kmpl', firstmail: 1200, secondmail: 2000, selected: false },
    { mail: '2000-3000 kmpl', firstmail: 2000, secondmail: 3000, selected: false },
    { mail: '3000-5000 kmpl', firstmail: 3000, secondmail: 5000, selected: false },
    { mail: '5000-10000 kmpl', firstmail: 5000, secondmail: 10000, selected: false },
    { mail: '10000-15000 kmpl', firstmail: 10000, secondmail: 15000, selected: false },
    { mail: '15000-30000 kmpl', firstmail: 15000, secondmail: 30000, selected: false },
    { mail: '30000-50000 kmpl', firstmail: 30000, secondmail: 50000, selected: false },
    { mail: '50000-100000 kmpl', firstmail: 50000, secondmail: 100000, selected: false },
  ]

  Colors = [
    { name: 'Black', selected: false }, { name: 'White', selected: false },
    { name: 'Blue', selected: false }, { name: 'Yellow', selected: false },
    { name: 'Green', selected: false }, { name: 'Grey', selected: false },
  ]

  Year = [
    { year: '1990-1995', y_start: 1990, y_end: 1995, selected: false },
    { year: '1996-2000', y_start: 1996, y_end: 2000, selected: false },
    { year: '2001-2005', y_start: 2001, y_end: 2005, selected: false },
    { year: '2006-2010', y_start: 2006, y_end: 2010, selected: false },
    { year: '2011-2015', y_start: 2011, y_end: 2015, selected: false },
    { year: '2016-2020', y_start: 2016, y_end: 2020, selected: false },
    { year: '2021-2025', y_start: 2021, y_end: 2025, selected: false },
  ]


  constructor(private globalservice: GlobalService, private router: Router) { }

  ngOnInit(): void {

    this.GetAllUsedCars();
    this.GetMostViewedUsedCars();
    this.Get_Brand_and_Model();

    this.CarReview = [
      { model: 'Maruti Swift', title: 'Live free Live Young', rating: '4', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Error sit quia maiores veritatis quibusdam aliquam quasi minus, nostrum repellat saepe nulla itaque qui tempore ? Exercitationem rerum earum asperiores.Explicabo, repellat.', reviews_by: 'Ramana', date: 'May 27,2019', views: '162' },
      { model: 'Maruti Swift', title: 'Live free Live Young', rating: '4', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Error sit quia maiores veritatis quibusdam aliquam quasi minus, nostrum repellat saepe nulla itaque qui tempore ? Exercitationem rerum earum asperiores.Explicabo, repellat.', reviews_by: 'Ramana', date: 'May 27,2019', views: '162' },
      { model: 'Maruti Swift', title: 'Live free Live Young', rating: '4', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Error sit quia maiores veritatis quibusdam aliquam quasi minus, nostrum repellat saepe nulla itaque qui tempore ? Exercitationem rerum earum asperiores.Explicabo, repellat.', reviews_by: 'Ramana', date: 'May 27,2019', views: '162' },
      { model: 'Maruti Swift', title: 'Live free Live Young', rating: '4', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Error sit quia maiores veritatis quibusdam aliquam quasi minus, nostrum repellat saepe nulla itaque qui tempore ? Exercitationem rerum earum asperiores.Explicabo, repellat.', reviews_by: 'Ramana', date: 'May 27,2019', views: '162' },
    ]
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }

  onSlideChange() {
    console.log('slide change');
  }

  getSelected() {
    // console.log("hi.......")
    // const checked = event.target.checked;
    // this.trade.forEach(item => item.selected = checked);

    this.selected_carbrand = this.Brands.filter(s => {
      return s.selected;
    });

    this.selected_Budget = this.car_budget.filter(s => {
      return s.selected;
    });
    this.selected_year = this.Year.filter(s => {
      return s.selected;
    });
    this.selected_kilometer = this.Kilometer.filter(s => {
      return s.selected;
    })
    this.selected_fueltype = this.FuelType.filter(s => {
      return s.selected;
    })
    console.log("selected checkbox", this.selected_carbrand, this.selected_Budget,
      this.selected_year, this.selected_kilometer, this.selected_fueltype,);
    this.FilterAll();
    // this.getSelectedmodel(event);
  }

  getOwnertype() {
    console.log("owner type", this.owner.value);
    let url = this.globalservice.base_path_api() + 'car-sale/filteralldatatwoapi';
    const body = {
      "owner": this.owner.value
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      this.loader = false;
      var filterdata = rsp.data;
      this.UsedCars = filterdata;
      console.log(" filter array res", this.UsedCars);
    })

  }

  FilterAll() {
    this.loader = true;
    this.selected_carbrand.filter(s => {
      this.selected_carbrand._id = s._id

    });

    // this.Brands.forEach((value, index) => {
    //   // console.log("brands are", value.selected, index);
    //   if (value.selected == false) {
    //     this.brandmodel.selected=false;  
    //     this.brandmodel.name = null
    //     this.brandmodel.length=0;
    //     // });
    //   } else if (value.selected == true) {
    //     this.brandmodel.filter(s => {
    //       this.brandmodel.name = s.name
    //     });
    //   }
    // });
    this.brandmodel.filter(s => {
      this.brandmodel.name = s.name
    });

    this.selected_Budget.filter(s => {
      this.selected_Budget.firstprice = s.firstprice,
        this.selected_Budget.secondprice = s.secondprice
    });
    this.selected_year.filter(s => {
      this.selected_year.y_start = s.y_start,
        this.selected_year.y_end = s.y_end
    });
    this.selected_kilometer.filter(s => {
      this.selected_kilometer.firstmail = s.firstmail,
        this.selected_kilometer.secondmail = s.secondmail
    });
    this.selected_fueltype.filter(s => {
      this.selected_fueltype.name = s.name
    });

    let url = this.globalservice.base_path_api() + 'car-sale/filteralldatatwoapi';
    const body = {
      "brand": this.selected_carbrand._id,
      "model": this.brandmodel.name,
      "fueltype": this.selected_fueltype.name,
      "year_start": this.selected_year.y_start,
      "year_end": this.selected_year.y_end,
      "kd_start": this.selected_kilometer.firstmail,
      "kd_end": this.selected_kilometer.secondmail,
      "eprice_sSvalue": this.selected_Budget.firstprice,
      "eprice_sEvalue": this.selected_Budget.secondprice,
      // "owner": this.owner.value
    }
    this.globalservice.PostRequest(url, body).subscribe(rsp => {
      this.loader = false;
      var filterdata = rsp.data;
      this.UsedCars = filterdata;
      console.log(" filter array res", this.UsedCars);
    })
  }

  bannerclick() {
    console.log("Banner is clicked");
  }

  GetAllUsedCars() {
    let url = this.globalservice.base_path_api() + 'car-sale/available/sellcar';
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.UsedCars = rsp.data;
      console.log("usedcars array res", this.UsedCars);
    })
  }

  Get_Brand_and_Model() {
    let url = this.globalservice.base_path_api() + 'car-sale/getbrandmodel';
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.Brands = rsp.data;
      console.log("usedcars brands and model res", this.Brands);
    })
  }

  GetMostViewedUsedCars() {
    let url = this.globalservice.base_path_api() + 'car-sale/getmostviewsellcar';
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.MostViewedUsedCars = rsp.data;
      console.log("usedcars array res", this.MostViewedUsedCars);
    })
  }

  getSelectedmodel(cm) {
    console.log("selected model", cm);
    this.selected_carbrandModel.push(cm);
    console.log("***model***", this.selected_carbrandModel);
    this.brandmodel = this.selected_carbrandModel.filter(s => {
      return s.selected;
    });
    console.log("***model selected***", this.brandmodel);
    this.FilterAll();
    // this.getSelected();
  }

  Usedcardetails(u) {
    console.log("id car", u._id);

    let url = this.globalservice.base_path_api() + 'car-sale/sellcar/' + u._id;
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      console.log("data", rsp.data);
      this.UsedCarDetails.push(rsp.data);
      console.log("array res", this.UsedCarDetails);
      this.router.navigate(['/UsedCarDetails'],
        { queryParams: { data: JSON.stringify(this.UsedCarDetails) } }
      );
    })
  }

}
