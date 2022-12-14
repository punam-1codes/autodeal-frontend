import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-comparison',
  templateUrl: './car-comparison.component.html',
  styleUrls: ['./car-comparison.component.scss']
})
export class CarComparisonComponent implements OnInit {
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false, "infinite": true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ]
  };

  car_comparison: any = [];

  constructor() { }

  ngOnInit(): void {
    this.car_comparison = [
      { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
      { img1: 'assets/Images/car8.jpg', price1: '9.65 Lakh', carname1: 'Honda City', img2: 'assets/Images/car7.jpg', price2: '9.65 Lakh', carname2: 'Maruti Suzuki Ciaz' },
    ]
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
