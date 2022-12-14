import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-brand-model-fuel-modals',
  templateUrl: './select-brand-model-fuel-modals.component.html',
  styleUrls: ['./select-brand-model-fuel-modals.component.scss']
})
export class SelectBrandModelFuelModalsComponent implements OnInit {
  car_brands: any = [];
  car_fuel: any = [];
  brand: any;
  car_model: any = [];

  cardetails:any=[];
  model:any;
  fuel:any;

  constructor(private globalservice: GlobalService,private router:Router) { }

  ngOnInit(): void {
    
    this.car_brands = [
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

    this.car_fuel = [
      { path: 'assets/Images/selectpetrol.PNG', name: 'Petrol' },
      { path: 'assets/Images/selectcng.PNG', name: 'CNG' },
      { path: 'assets/Images/selectdiesel.PNG', name: 'Diesel' },
    ]
  }

  onBrandClick(b) {
    console.log(b, b.brand);
    this.brand = b.brand
    if (this.brand) {
      document.getElementById('sgbrand').removeAttribute("disabled");
    } else {
      document.getElementById('sgbrand').setAttribute("disabled", null);
    }
  }

  BrandNext() {
    if (this.brand == null) {
      alert('Please select brand')
    } else {
      let url = this.globalservice.base_path_api() + 'cars/filteralldata';
      const body = {
        brand: this.brand,
      }
      this.globalservice.PostRequest(url, body).subscribe(rsp => {
        var filterdata = rsp.data;
        this.car_model = filterdata;
        console.log(" array res", this.car_model);
      })
    }
  }

  fuelNextBtn(){
    console.log("2nd time navigate page");
    // this.router.navigate(["/carservice"])
    this.cardetails=[{
      brand:this.brand,
      model:this.model,
      fuel:this.fuel
    }]
    console.log("get cardetials data",this.cardetails);
    
    this.router.navigate(['/carservice'],
        { queryParams: { data: JSON.stringify(this.cardetails) } }
      );

    // setTimeout(()=>{
    //   console.log("after 2 sec ");
      
    //   this.router.navigate(["/carservice"])
    // },2000)
  }


  onModelClick(event:any){
    console.log("get click model",event);
    this.model=event.model
    if (event) {
      document.getElementById('sgmodel').removeAttribute("disabled");
    } else {
      document.getElementById('sgmodel').setAttribute("disabled", null);
    }
  }


  onFuelClick(event:any){
    console.log("get fual type",event);
    this.fuel=event.name
    if (event) {
      document.getElementById('sgfuel').removeAttribute("disabled");
    } else {
      document.getElementById('sgfuel').setAttribute("disabled", null);
    }
  }
}
