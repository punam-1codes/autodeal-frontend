import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-newssection',
  templateUrl: './newssection.component.html',
  styleUrls: ['./newssection.component.scss']
})
export class NewssectionComponent implements OnInit {
  carnews: any = [];
  showall: boolean = false;
  constructor(private globalservice: GlobalService,public router:Router) { }

  ngOnInit(): void {
    this.getCarNews();
    // this.carnews = [
    //   { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "11 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india" },
    //   { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "12 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in indiaThe Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
    //   { img: "assets/Images/car8.jpg", heading: "Marauti Has Sold More Than 25 Lakh Swifts In India!", publisher: "Auto Deal", time: "13 Hours ago", desc: "The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india The Swift, which was first launched in 2005, is in its third generation in india" },
    // ]
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '..........' :
      string;
  }

  getCarNews() {
    let url = this.globalservice.base_path_api() + 'car-news/getnews';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      this.carnews = rsp.data;
      console.log("Car News Industry Updates...", this.carnews);

    })
  }

  newsdetails(c){
    console.log("news details",c)
    this.router.navigate(['/newsdetails'],
    { queryParams: { newsdata: JSON.stringify(c) } }
  )
  }

}
