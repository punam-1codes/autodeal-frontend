import { Component, OnInit ,TemplateRef,ViewChild} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalDirective } from "ngx-bootstrap/modal";
import {TestdriveLocationComponent} from '../testdrive-location/testdrive-location.component';
import {TestdriveDateandtimeComponent} from '../testdrive-dateandtime/testdrive-dateandtime.component';
// import {TestdriveBringcarComponent} from '../testdrive-bringcar/testdrive-bringcar.component';

@Component({
  selector: 'app-testdrive-bringcar',
  templateUrl: './testdrive-bringcar.component.html',
  styleUrls: ['./testdrive-bringcar.component.scss']
})
export class TestdriveBringcarComponent implements OnInit {
  @ViewChild('templatefirst') public templatefirst :ModalDirective;
  public bsModalRef: BsModalRef;
  dLocation: any;
  drivedetails: any = [];
  constructor(public modalService: BsModalService) { }

  ngOnInit(): void {
    this.drivedetails = [
      { icon: 'fas fa-map-marker-alt', head: 'Choose a location', subhead: 'Your current location or any other', code: '1' },
      { icon: 'far fa-clock', head: 'Choose time', subhead: 'Select slot convenient for you', code: '2' }
    ]
  }

  //here we add consition if user have location already in database then enable button if not so disable button
  locationSign() {
    if (this.dLocation) {
      document.getElementById('locationDisable').removeAttribute("disabled");
    }
    else {
      document.getElementById('locationDisable').setAttribute("disabled", null);
    }
  }

  testdrive(code) {
    if (code == "1") {
      console.log("1");
      
      this.bsModalRef = this.modalService.show(TestdriveLocationComponent, {
        animated: true,
        backdrop: 'static',
        class: 'modal-lg',
      });
      // this.modalService.hide();
      // localStorage.setItem('Modaldata', JSON.stringify(cardata));
    } else if (code == "2") {
      console.log("2");
      this.bsModalRef = this.modalService.show(TestdriveDateandtimeComponent, {
        animated: true,
        backdrop: 'static',
        class: 'modal-lg',
      });
    }
  }

}
