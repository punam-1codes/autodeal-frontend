import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

//here we add 
import { Router } from '@angular/router';


@Component({
  selector: 'app-latestcarfooter',
  templateUrl: './latestcarfooter.component.html',
  styleUrls: ['./latestcarfooter.component.scss']
})
export class LatestcarfooterComponent implements OnInit {

  Newcars: any = [];
  Popularcars: any = [];
  CarsbyBody: any = [];
  car_bybody: any;

  cdata: any;
  bdata: any;

  constructor(private globalservice: GlobalService , public router: Router) { }
  popular_carsdata:any;
  

  ngOnInit(): void {
    this.Newcars = [
      { title: 'Find New Cars' }, { title: 'Upcoming New Car' }, { title: 'New Car Insurance' },
      { title: 'New Car Finance' }, { title: 'New Car Offers' }, { title: 'New Car Compare' },
    ]
    this.Popularcars = [
      { title: 'Buy Mercedes Cars', name: 'Mercedes' }, { title: 'Buy BMW Cars', name:'BMW' },
      { title: 'Buy Audi Cars', name: 'Audi' }, { title: 'Buy Maruti Cars', name: 'Maruti' },
      { title: 'Buy Hyundai Cars', name: 'Hyundai' }, { title: 'Buy Honda Cars', name: 'Honda' },
    ]
    this.CarsbyBody = [
      { title: 'Sedan New Car', body: 'Sedan' }, { title: 'SUV New Car', body: 'SUV' }, { title: 'MUV New Car', body: 'MUV' },
      { title: 'Hatchback New Car', body: 'Hatchback' }, { title: 'Coupe New Car', body: 'Coupe' }, { title: 'Roadster New Car', body: 'Roadster' },
      
    ]
  }

  OnClickCarsByBody(b) {
    let url = this.globalservice.base_path_api() + 'cars/car/categories/' + b.body;
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      console.log("data", rsp.data);
      this.car_bybody = rsp.data;
      console.log("car by body res", this.car_bybody);
    })
  }

  OnClickCarsByBrand(e){
    console.log("cars by brand footer",e);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + e;
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      console.log("respoinse in url",rsp);
      
      this.bdata = rsp.data;
      console.log("latestcarfooter bdata", this.bdata);
      
      // this.router.navigate(['/searchcars'],
      //   { queryParams: { data: JSON.stringify(this.bdata) } }
      // );

    })
  }


  OnClickCarsByCategories(e){
    console.log("this is e value",e);
    let url = this.globalservice.base_path_api() + 'cars/car/categories/' + e;
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      console.log("respoinse in url",rsp);
      
      this.cdata = rsp.data;
      console.log("latestcarfooter cdata", this.cdata);
      
      // this.router.navigate(['/searchcars'],
      //   { queryParams: { data: JSON.stringify(this.cdata) } }
      // );

    })
  }




  OnClickPopularCars(p){
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + p.name;
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.popular_carsdata = rsp.data;
      console.log("Popular cars data", this.popular_carsdata);
    })
  }
}
