import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { CarCategoriesComponent } from './Pages/home/car-categories/car-categories.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { SearchbyBBFComponent } from './Pages/home/searchby-b-b-f/searchby-b-b-f.component';
import { CarComparisonComponent } from './Pages/home/car-comparison/car-comparison.component';
import { IndustryUpdatesComponent } from './Pages/home/industry-updates/industry-updates.component';
import { LatestcarfooterComponent } from './Pages/home/latestcarfooter/latestcarfooter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutodealDashboardComponent } from './Pages/autodeal-dashboard/autodeal-dashboard.component';
import { DashboardSidenavComponent } from './Pages/autodeal-dashboard/dashboard-sidenav/dashboard-sidenav.component';
import { BrandDetailsComponent } from './Pages/brand-details/brand-details.component';
import { NewssectionComponent } from './Pages/newssection/newssection.component';
import { CarDetailsComponent } from './Pages/car-details/car-details.component';
import { SpecificationComponent } from './Pages/specification/specification.component';
import { BannerComponent } from './Pages/banner/banner.component';
import { TermsconditionsComponent } from './Pages/termsconditions/termsconditions.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { ContactUSComponent } from './Pages/contact-us/contact-us.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarVideoComponent } from './Pages/car-video/car-video.component';
import { OffersComponent } from './Pages/offers/offers.component';
import { CarNewsComponent } from './Pages/car-news/car-news.component';
import { CarMoreOptionComponent } from './Pages/car-more-option/car-more-option.component';
import { ConfusedComponent } from './Pages/confused/confused.component';
import { IndiaComponent } from './Pages/india/india.component';
import { NewsDetailComponent } from './Pages/news-detail/news-detail.component';
import { CarServiceGuideComponent } from './Pages/car-service-guide/car-service-guide.component';
import { EmiCalculatorComponent } from './Pages/emi-calculator/emi-calculator.component';
// import { AgmCoreModule } from '@agm/core';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ComparisionComponent } from './Pages/comparision/comparision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SearchcarComponent } from './Pages/searchcar/searchcar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserReviewComponent } from './Pages/user-review/user-review.component';
import { CarPricesComponent } from './Pages/car-prices/car-prices.component';
import { ComparecarsComponent } from './Pages/comparecars/comparecars.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarImagesComponent } from './Pages/car-images/car-images.component';
import { SwiperModule } from 'swiper/angular';
import {ModalsModule} from './Pages/Modals/modals.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { SellCarComponent } from './Pages/sell-cars/sell-car/sell-car.component';
import { SelectBrandModelFuelModalsComponent } from './Pages/sell-cars/select-brand-model-fuel-modals/select-brand-model-fuel-modals.component';
import { CarServiceInfoComponent } from './Pages/sell-cars/car-service-info/car-service-info.component';
import { RouterTestingModule } from "@angular/router/testing";


import { UsedCarsComponent } from './Pages/used-cars/used-cars.component';
import {UsedCarsModule} from './Pages/used-cars/used-cars.module';
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { NewsblogComponent } from './Pages/newsblog/newsblog.component';
import {MatGridListModule} from '@angular/material/grid-list';

// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, HeaderComponent, FooterComponent, CarCategoriesComponent, SearchbyBBFComponent,
    CarComparisonComponent, IndustryUpdatesComponent, LatestcarfooterComponent, AutodealDashboardComponent,
    DashboardSidenavComponent, BrandDetailsComponent, NewssectionComponent, CarDetailsComponent, SpecificationComponent,
    BannerComponent, TermsconditionsComponent, PrivacyPolicyComponent, ContactUSComponent, AboutUsComponent,
    CarVideoComponent, OffersComponent, CarNewsComponent, CarMoreOptionComponent, ConfusedComponent, IndiaComponent,
    NewsDetailComponent, CarServiceGuideComponent, EmiCalculatorComponent, ComparisionComponent,
    SearchcarComponent, CarPricesComponent,
    UserReviewComponent,
    ComparecarsComponent,
    CarImagesComponent,
    SellCarComponent,SelectBrandModelFuelModalsComponent, CarServiceInfoComponent, UsedCarsComponent, NewsblogComponent,  

  ],
  imports: [
    BrowserModule, CommonModule, AppRoutingModule, BrowserAnimationsModule, MatTabsModule, MatIconModule,
    NgbModule, CarouselModule, ReactiveFormsModule, SlickCarouselModule,
    FormsModule, MatAutocompleteModule,
    SwiperModule,ModalsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    NgxSliderModule,
    MatGridListModule,
    // GooglePlaceModule,
    Ng2SearchPipeModule, NgxPaginationModule,UsedCarsModule,MatDatepickerModule,MatNativeDateModule,
    MatFormFieldModule,MatInputModule,
    ToastrModule.forRoot()
    // AgmCoreModule.forRoot({
    //   apiKey: ''
    // })

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
