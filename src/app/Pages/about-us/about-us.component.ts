import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 600,
  //   navText: ['&#8249', '&#8250;'],
  //   responsive: {
  //     0: {
  //       items: 1 
  //     },
  //     400: {
  //       items: 2
  //     },
  //     760: {
  //       items: 3
  //     },
  //     1000: {
  //       items: 4
  //     }
  //   },
  //   nav: true
  // }
  customOptions: OwlOptions = {
    loop: true,
    nav: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout:3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    
  }
  ngOnInit(): void {
  }
 

}
