import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { BsModalService,ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {
  SellerDetail:any=[];
  RecommendedUsedCars:any=[];
  p: number = 1;
  Userdata:any=[];
  loginwarn:boolean=false;
  constructor(private globalservice: GlobalService,public modalService: BsModalService,
    public options: ModalOptions, private router:Router) { }

  ngOnInit(): void {
    this.Userdata = JSON.parse(localStorage.getItem("userdata"));
    if (this.Userdata == null) {
      this.loginwarn = true;
    } else {
      this.loginwarn = false;
    }
    this.GetRecommendedCars();
    this.SellerDetail.push(this.options.initialState);
    console.log("seller details",this.SellerDetail);
  }

  GetRecommendedCars() {
    let url = this.globalservice.base_path_api() + 'car-sale/latestcars';
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      this.RecommendedUsedCars = rsp.data;
      console.log("usedcars array res", this.RecommendedUsedCars);
    })
  }

  ViewCarDetails(r) {
    console.log(r._id);
    let url = this.globalservice.base_path_api() + 'car-sale/sellcar/' + r._id;
    this.globalservice.PostRequest(url, {}).subscribe(rsp => {
      console.log("data", rsp.data);
      let data = [];
      data.push(rsp.data);
      this.modalService.hide();

      this.router.navigate(['/UsedCarDetails'],
        { queryParams: { data: JSON.stringify(data) } }
      )
      // .then(() => {
      //   window.location.reload();
      // });
    })

  }

}
