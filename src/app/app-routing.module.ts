import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { AutodealDashboardComponent } from './Pages/autodeal-dashboard/autodeal-dashboard.component';
import { BrandDetailsComponent } from './Pages/brand-details/brand-details.component';
import { CarDetailsComponent } from './Pages/car-details/car-details.component';
import { SpecificationComponent } from './Pages/specification/specification.component';
import { TermsconditionsComponent } from './Pages/termsconditions/termsconditions.component';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { ContactUSComponent } from './Pages/contact-us/contact-us.component';
import { AboutUsComponent } from './Pages/about-us/about-us.component';
import { CarVideoComponent } from './Pages/car-video/car-video.component';
import { CarNewsComponent } from './Pages/car-news/car-news.component';
import { NewsDetailComponent } from './Pages/news-detail/news-detail.component';
import { CarServiceGuideComponent } from './Pages/car-service-guide/car-service-guide.component';
import { EmiCalculatorComponent } from './Pages/emi-calculator/emi-calculator.component';
import { ComparisionComponent } from './Pages/comparision/comparision.component';
// import { UserReviewComponent } from './Pages/user-review/user-review.component';
import { SearchcarComponent } from './Pages/searchcar/searchcar.component';
import { CarPricesComponent } from './Pages/car-prices/car-prices.component';
import { ComparecarsComponent } from './Pages/comparecars/comparecars.component';
import{SelectBrandModelFuelModalsComponent} from './Pages/sell-cars/select-brand-model-fuel-modals/select-brand-model-fuel-modals.component';
import { CarServiceInfoComponent } from './Pages/sell-cars/car-service-info/car-service-info.component';
import { SellCarComponent } from './Pages/sell-cars/sell-car/sell-car.component';
import { AutodealCareersComponent } from './Pages/autodeal-careers/autodeal-careers.component';
import { UsedCarsComponent } from './Pages/used-cars/used-cars.component';
import { NewsblogComponent } from './Pages/newsblog/newsblog.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  {
    path: 'dashboard',
    component: AutodealDashboardComponent,
    children: [
      {
        path: 'myorders',
        loadChildren: () => import('./Pages/autodeal-dashboard/myorders/myorders.module').then(m => m.MyordersModule),
      },
      {
        path: 'myvehicle',
        loadChildren: () => import('./Pages/autodeal-dashboard/myvehicles/myvehicles.module').then(m => m.MyvehiclesModule),
      },
      {
        path: 'profilesettings',
        loadChildren: () => import('./Pages/autodeal-dashboard/profilesettings/profilesettings.module').then(m => m.ProfilesettingsModule),
      },

    ]
  },
  { path: 'brand-details', component: BrandDetailsComponent },
  { path: 'cardetails', component: CarDetailsComponent },
  { path: 'specification', component: SpecificationComponent },
  { path: 'termsandcontions', component: TermsconditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contactus', component: ContactUSComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'carvideo', component: CarVideoComponent },
  { path: 'carnews', component: CarNewsComponent },
  { path: 'newsdetails', component: NewsDetailComponent },
  { path: 'service-guide', component: CarServiceGuideComponent },
  { path: 'emi-calculator', component: EmiCalculatorComponent },
  { path: 'comparision', component: ComparisionComponent },
  { path: 'searchcars', component: SearchcarComponent },
  { path: 'car-prices', component: CarPricesComponent },
  { path: 'comparecars', component: ComparecarsComponent },
  { path: 'Selectmodals', component: SelectBrandModelFuelModalsComponent },
  { path: 'carservice', component: CarServiceInfoComponent },
  { path: 'autodeal-careers', component: AutodealCareersComponent },
  { path: 'newsblog', component: NewsblogComponent },

  {
    path: "Modals",
    loadChildren: () => import('./Pages/Modals/modals.module').then(mod => mod.ModalsModule)
  },
  { path: 'sellcar', component: SellCarComponent },
  {
    path: "Used-cars",
    loadChildren: () => import('./Pages/used-cars/used-cars.module').then(mod => mod.UsedCarsModule)
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
