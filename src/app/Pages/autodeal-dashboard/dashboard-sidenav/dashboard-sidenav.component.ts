import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { GlobalService } from '../../../../app/services/global.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {
  constructor(private route:Router,private globalservice: GlobalService,) { }

  ngOnInit(): void {
  }

  logoutdash(){
  console.log("Logout button call dash");
  localStorage.removeItem("userinfo");
  //reload entire page for new user sign up
  // window.location.reload();
  window.open(
    // "http://localhost:4200/home"
    "http://dealcars.in/", "_self");
  // this.route.navigate(['/home']);
  }

}

