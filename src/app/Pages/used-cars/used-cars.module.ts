import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsedCarsRoutingModule } from './used-cars-routing.module';
import { UsedCarDetailsComponent } from './used-car-details/used-car-details.component';
import { SwiperModule } from 'swiper/angular';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import {NgxPaginationModule} from 'ngx-pagination';
import { GetTestDriveComponent } from './get-test-drive/get-test-drive.component';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UsedCarDetailsComponent, GetTestDriveComponent, SellerDetailsComponent],
  imports: [
    CommonModule,SwiperModule,NgxSliderModule,
    UsedCarsRoutingModule,FormsModule, ReactiveFormsModule,NgxPaginationModule,
    MatDatepickerModule,MatFormFieldModule,MatInputModule,
    // GooglePlaceModule,
     ModalModule.forRoot(),
     MatNativeDateModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [BsModalService],

})
export class UsedCarsModule { }
