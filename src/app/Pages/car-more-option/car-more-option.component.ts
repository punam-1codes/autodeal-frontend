import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-car-more-option',
  templateUrl: './car-more-option.component.html',
  styleUrls: ['./car-more-option.component.scss']
})
export class CarMoreOptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    nav: false,
    navSpeed: 700,
    dots: false,
    autoplay: true,
    autoplayTimeout:3000,
    navText: ['<i class="fas fa-caret-left"></i>', '<i class="fas fa-caret-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    
  }

}
