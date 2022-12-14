import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  branddata:any=[]

  constructor(public router: Router, private globalservice: GlobalService) { }

  ngOnInit(): void {
  }

  goToBrand(e:any){
    console.log("brand name",e);
    let url = this.globalservice.base_path_api() + 'cars/car/brands/' + e;
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.branddata = rsp.data;
      console.log("brand data footer", this.branddata);
      //here we change searchcars to brand-details
      this.router.navigate(['/brand-details'],
        { queryParams: { data: JSON.stringify(this.branddata) } }
      );
    })
  }

  pageRouteCU(){
    this.router.navigate(['/contactus'])
  }

  pageRouteAU(){
    this.router.navigate(['/aboutus'])
  }

  pageRoutePP(){
    this.router.navigate(['/privacy-policy'])
  }

  pageRouteTC(){
    this.router.navigate(['/termsandcontions'])
  }

  pageRouteWH(){
    this.router.navigate(['/autodeal-careers'])
  }



}
