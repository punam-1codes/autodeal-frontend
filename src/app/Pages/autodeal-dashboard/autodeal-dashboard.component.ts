import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autodeal-dashboard',
  templateUrl: './autodeal-dashboard.component.html',
  styleUrls: ['./autodeal-dashboard.component.scss']
})
export class AutodealDashboardComponent implements OnInit {
  currentComponent = "";
  constructor() { }

  ngOnInit(): void {
  }

  handleChange(t) {
    alert(t)
    this.currentComponent = t;
  }
}
