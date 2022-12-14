import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service'
import { FormGroup, FormControl, Validators,FormBuilder, FormArray} from '@angular/forms';
import { Body } from '@angular/http/src/body';
import { ToastrManager } from 'ng6-toastr-notifications';

import SwiperCore, {Swiper, Virtual, SwiperOptions, Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([Virtual,Navigation, Pagination, Scrollbar, A11y]);
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-sell-car',
  templateUrl: './sell-car.component.html',
  styleUrls: ['./sell-car.component.scss']
})
export class SellCarComponent implements OnInit {
  public bsModalRef: BsModalRef;

  allBrands:any=[]
  selectedBrandNG:any;
  selectBrand:any="Select Brand"

  allModels:any=[]
  selectModel:any="Select Model"
  selectedModelNG:any;

  allVarient:any=[]
  selectVarient:any="Select Varient"
  selectedVarientNG:any;


  getCARBMV:boolean=false;


  //Make year
  allMonth:any=[
    {_id:1},{_id:2},{_id:3},{_id:4},{_id:5},{_id:6},{_id:7},{_id:8},{_id:8},{_id:9},{_id:10},{_id:11},{_id:12},
  ]
  selectMonth:any="Select Month"
  selectedMonthNG:any;


  allYear:any=[
    {_id:1999},{_id:2000},{_id:2001},{_id:2002},{_id:2003},{_id:2004},{_id:2005},{_id:2006},{_id:2007},{_id:2008},{_id:2009},{_id:2010},
    {_id:2011},{_id:2012},{_id:2013},{_id:2014},{_id:2015},{_id:2016},{_id:2017},{_id:2018},{_id:2019},{_id:2020},{_id:2021},{_id:2022},{_id:2023},
  ]
  selectYear:any="Select Year"
  selectedYearNG:any;


  getCARMY:boolean=false;


  //Owner
  allOwner:any=[
    {_id:"1st Owner"},{_id:"2nd Owner"},{_id:"3rd Owner"},{_id:"4th Owner"},
    
  ]
  selectOwner:any="Select Owner"
  selectedOwnerNG:any;

  getCAROwner:boolean=false;

  //city
  allCity:any=[
    {_id:"Mumbai"},{_id:"Thane"},{_id:"Dadar"},{_id:"Sion"},
    
  ]
  selectCity:any="Select City"
  selectedCityNG:any;
  

  //car insurance valid date
  insuranceValidDate:any;


  ssArray:any=[
    {name:'Driver Air Bag',value:'Driver Air Bag'},
    {name:'Passenger Air Bag',value:'Passenger Air Bag'},
    {name:'Anti-Lock Brakes',value:'Anti-Lock Brakes'},
    {name:'Immobilizer',value:'Immobilizer'},
    {name:'Child Safety Lock',value:'Child Safety Lock'},
    {name:'Traction Control',value:'Traction Control'},
  ]

  ccArray:any=[
    {name:'Air Conditioning',value:'Air Conditioning'},
    {name:'Power Steering',value:'Power Steering'},
    {name:'Power Windows',value:'Power Windows'},
    {name:'Power Door Locks',value:'Power Door Locks'},
    {name:'Power Seats',value:'Power Seats'},
    {name:'Defogger',value:'Defogger'},
    {name:'Central Locking',value:'Central Locking'},
    {name:'Steering Adjustment',value:'Steering Adjustment'},
    {name:'Power Seats',value:'Power Seats'},
    {name:'Remote Boot / Fuel-Lid',value:'Remote Boot / Fuel-Lid'},
  ]

  ofArray:any=[
    {name:'Alloy Wheels',value:'Alloy Wheels'},
    {name:'Rear Wash Wiper',value:'Rear Wash Wiper'},
    {name:'Audio System',value:'Audio System'},
    {name:'Cup Holder',value:'Cup Holder'},
    {name:'Tubeless Tyros',value:'Tubeless Tyros'},
    {name:'Fog Lights',value:'Fog Lights'},
    {name:'Leather Seats',value:'Leather Seats'},
    {name:'Tachometer',value:'Tachometer'},
  ]


  sellcarform: FormGroup;

 

  // sellcarform=new FormGroup({
  //   brandSC: new FormControl('', Validators.required),
  //   modelSC: new FormControl('', Validators.required),
  //   varientSC: new FormControl('', Validators.required),
  //   monthSC: new FormControl('', Validators.required),
  //   yearSC: new FormControl('', Validators.required),
  //   ownerSC: new FormControl('', Validators.required),
  //   colorSC: new FormControl('', Validators.required),
  //   kdDoneSC: new FormControl('', Validators.required),
  //   citySC: new FormControl('', Validators.required),
  //   registrationNoSC: new FormControl('', Validators.required),
  //   registrationAtSC: new FormControl('', Validators.required),
  //   lifeTimeTaxSC: new FormControl('', Validators.required),
  //   carInsuranceSC: new FormControl('', Validators.required),
  //   insuranceValidTillSC: new FormControl('', Validators.required),
  //   estimatedPriceSC: new FormControl('', Validators.required),
  //   isCarAccidentalSC: new FormControl('', Validators.required),
  //   isCarFloodAffectedSC: new FormControl('', Validators.required),
  //   safetyAndSecuritySC:new FormControl('', Validators.required),
  // })


  carReviews: any = [];

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 100,
    effect: "fade",
    loop: true,
    lazy: {
      loadPrevNext: true,
    },
    zoom: {
      maxRatio: 5,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: true,
    breakpoints: {
      500: {
        slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
      }
    }

  };


  //model is
  selluserid:any;
  selluserarray:any=[];


  //30-09-2022
  sellcarusername:any="NA"
  sellcarmodel:any="NA"
  sellcarmakeyear:any="NA"
  sellcarkmdone:any="NA"
  sellcarestimatedprice:any="NA"

  sellcarbrand:any="NA"
  sellcarvarient:any="NA"

  



  constructor(private globalservice: GlobalService,private fb: FormBuilder,public toastr: ToastrManager,private router:Router,public modalService: BsModalService) {
    this.sellcarform=this.fb.group({
      // safetyAndSecuritySC: this.fb.array([], [Validators.required]),
      safetyAndSecuritySC: this.fb.array([]),
      comfontAndConvenienceSC: this.fb.array([]),
      otherFeaturesSC: this.fb.array([]),

      brandSC: new FormControl('', Validators.required),
      modelSC: new FormControl('', Validators.required),
      varientSC: new FormControl('', Validators.required),
      monthSC: new FormControl('', Validators.required),
      yearSC: new FormControl('', Validators.required),
      ownerSC: new FormControl('', Validators.required),
      colorSC: new FormControl(''),
      kdDoneSC: new FormControl(''),
      citySC: new FormControl('', Validators.required),
      registrationNoSC: new FormControl(''),
      registrationAtSC: new FormControl(''),
      lifeTimeTaxSC: new FormControl('Individual'),
      carInsuranceSC: new FormControl('Comprehensive'),
      insuranceValidTillSC: new FormControl('',Validators.required),
      estimatedPriceSC: new FormControl(''),
      isCarAccidentalSC: new FormControl('Yes'),
      isCarFloodAffectedSC: new FormControl('Yes'),

      airConditioningSC:new FormControl('Excellent'),
      batteryConditioningSC:new FormControl('Excellent'),
      brakesConditioningSC:new FormControl('Excellent'),
      carElectricalsSC:new FormControl('Excellent'),
      carEnginesSC:new FormControl('Excellent'),
      seatConditionSC:new FormControl('Excellent'),
      sunspensionsSC:new FormControl('Excellent'),
      tyresConamonSC:new FormControl('Excellent'),
      intenorConditionSC:new FormControl('Excellent'),
      exteriorConditionSC:new FormControl('Excellent'),
      overAllCarConditionSC:new FormControl('Excellent'),

      availableWarrantiesSC:new FormControl(''),
      majorModificationsSC:new FormControl(''),
      specialNoteSC:new FormControl(''),

      nameSC:new FormControl('', Validators.required),
      mobileSC:new FormControl('', Validators.required),
      emailSC:new FormControl('', Validators.required),
     

    })



    let url = this.globalservice.base_path_api() + 'c-review/getallcreview';
    this.globalservice.postRequest(url, {}).subscribe(rsp => {
      // console.log("data", rsp.data);
      this.carReviews = rsp.data;
      // console.log("array car review res", this.carReviews);

    })

  }

  ngOnInit(): void {
    let getbrandurl = this.globalservice.base_path_api() + 'cars/allbrands';
    this.globalservice.PostRequest(getbrandurl, {}).subscribe(rsp => {
      // console.log(" all brand rsp", rsp.data);
      this.allBrands = rsp.data;
      // console.log("all brands data", this.allBrands);
    })
  }

  getAllModelsSC(){
    // console.log("get Seleted brand",this.selectedBrandNG);
    if(this.selectedBrandNG){
    let getmodelurl = this.globalservice.base_path_api() + 'cars/getbranddetails';
    this.globalservice.PostRequest(getmodelurl, {brand: this.selectedBrandNG }).subscribe(rsp => {
      // console.log(" all model rsp", rsp.data);
      this.allModels = rsp.data;
      // console.log("all model data", this.allModels);
    })
    }
    else{
      // console.log("WARINIG - BRAND NOT SELETED");
    }
  }


  getAllVarientSC(){
    // console.log("get selected model varients",this.selectedModelNG);
    if(this.selectedModelNG){
      let getvarienturl = this.globalservice.base_path_api() + 'cars/getallvarients';
      this.globalservice.PostRequest(getvarienturl, {model: this.selectedModelNG }).subscribe(rsp => {
      // console.log(" all varient rsp", rsp.data);
      this.allVarient = rsp.data;
      // console.log("all varient data", this.allVarient);
    })
    }else{
      // console.log("WARNING - Model not selected");
      
    }
  }


  getSellCar(){
    // console.log("all selll car data",this.selectedBrandNG,this.selectedModelNG,this.selectedVarientNG);
    if(this.selectedBrandNG && this.selectedModelNG && this.selectedVarientNG){
      // console.log("get getCARBMV");
      this.getCARBMV=true;
    }else{
      // console.log("not get getCARBMV");
      this.getCARBMV=false;
    }
  }

  getMonthSC(){
    // console.log("get selected month",this.selectedMonthNG);
  }

  getYearSC(){
    // console.log("get selected year",this.selectedYearNG);
    // console.log("get Make Year Value",this.selectedMonthNG,this.selectedYearNG);
    if(this.selectedMonthNG && this.selectedYearNG){
      // console.log("car Month Year GET");
      this.getCARMY=true
    }else{
      // console.log("NOT  Month Year GET");
      this.getCARMY=false
    }
  }

  getOwnerSC(){
    // console.log("get owner ",this.selectedOwnerNG);
    if(this.selectedOwnerNG){
      // console.log("Owner GET");
      this.getCAROwner=true
    }else{
      // console.log("NOT GET Owner");
      this.getCAROwner=false
    }
  }

  getCitySC(){
    // console.log("Get City",this.selectedCityNG);
    
  }

  getIVD(){
    // console.log("insurance valid date",this.insuranceValidDate);
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.sellcarform.get('safetyAndSecuritySC') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  onCheckboxChangeCC(e:any){
    const checkArray: FormArray = this.sellcarform.get('comfontAndConvenienceSC') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  onCheckboxChangeOF(e:any){
    const checkArray: FormArray = this.sellcarform.get('otherFeaturesSC') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  sellCarSubmit(){
    // console.log("form value",this.sellcarform);

    let sendsellcar=this.globalservice.base_path_api() + 'car-sale/addsellcar';
    let body={
      brand:this.sellcarform.value.brandSC,
      model:this.sellcarform.value.modelSC,
      varient:this.sellcarform.value.varientSC,
      month:this.sellcarform.value.monthSC,
      year:this.sellcarform.value.yearSC,
      owner:this.sellcarform.value.ownerSC,
      color:this.sellcarform.value.colorSC,
      kd_Done:this.sellcarform.value.kdDoneSC,
      city:this.sellcarform.value.citySC,
      registration_no:this.sellcarform.value.registrationNoSC,
      registration_at:this.sellcarform.value.registrationAtSC,
      life_time_tax:this.sellcarform.value.lifeTimeTaxSC,
      car_insurance:this.sellcarform.value.carInsuranceSC,
      insurance_valid_till:this.sellcarform.value.insuranceValidTillSC,
      estimated_price:this.sellcarform.value.estimatedPriceSC,
      is_car_accidental:this.sellcarform.value.isCarAccidentalSC,
      is_car_flood_affected:this.sellcarform.value.isCarFloodAffectedSC,
      air_conditioning:this.sellcarform.value.airConditioningSC,
      battery_conditioning:this.sellcarform.value.batteryConditioningSC,
      brakes_conditioning:this.sellcarform.value.brakesConditioningSC,
      car_electricals:this.sellcarform.value.carElectricalsSC,
      car_engines:this.sellcarform.value.carEnginesSC,
      seat_condition:this.sellcarform.value.seatConditionSC,
      sunspensions:this.sellcarform.value.sunspensionsSC,
      tyres_conamon:this.sellcarform.value.tyresConamonSC,
      intenor_condition:this.sellcarform.value.intenorConditionSC,
      exterior_condition:this.sellcarform.value.exteriorConditionSC,
      over_all_car_condition:this.sellcarform.value.overAllCarConditionSC,
      available_warranties:this.sellcarform.value.availableWarrantiesSC,
      major_modifications:this.sellcarform.value.majorModificationsSC,
      special_note:this.sellcarform.value.specialNoteSC,
      name:this.sellcarform.value.nameSC,
      mobile:this.sellcarform.value.mobileSC,
      email:this.sellcarform.value.emailSC,
      safety_and_security:this.sellcarform.value.safetyAndSecuritySC,
      comfont_and_convenience:this.sellcarform.value.comfontAndConvenienceSC,
      other_features:this.sellcarform.value.otherFeaturesSC,

    }
    this.globalservice.PostRequest(sendsellcar, body).subscribe(rsp => {
      console.log("get added sell car", rsp.data);
      this.selluserid=rsp.data._id
      console.log("sell user id",this.selluserid);

      this.getSellUserData( this.selluserid)
      

      if(rsp.data){
        // console.log("msg pop");
        this.toastr.successToastr('Thanks for filling out our form!', 'Success!');

        setTimeout(()=>{
          // console.log("sell car form reset");
          
          this.sellcarform.reset()

          // this.selectBrand="Select Brand"
          // this.selectModel="Select Model"
          // this.selectVarient="Select Varient"
          // this.selectMonth="Select Month"
          // this.selectYear="Select Year"
          // this.selectOwner="Select Owner"
          // this.selectCity="Select City"

        },3000)


      }
      else{
        // console.log("sell cars form failed");
        this.toastr.errorToastr('This is error.', 'Oops!');
      }
    })
    
    
  }


  getSellUserData(eventid:any){
    console.log("sell user data function call",eventid);
    let getselluserdata=this.globalservice.base_path_api() + 'car-sale/sellcar/'+eventid;

    this.globalservice.PostRequest(getselluserdata, {}).subscribe(rsp => {
      console.log("get sell car data", rsp.data);
      this.selluserarray=rsp.data
      console.log("get sell car user data in selluserarray",this.selluserarray);
      this.sellcarusername=this.selluserarray.name
      this.sellcarmodel=this.selluserarray.model
      this.sellcarmakeyear=this.selluserarray.year
      this.sellcarkmdone=this.selluserarray.kd_Done
      this.sellcarestimatedprice=this.selluserarray.estimated_price

      this.sellcarbrand=this.selluserarray.brand
      this.sellcarvarient=this.selluserarray.varient
    })

  }


  backToHome(){
    console.log("go to home page");
    window.location.reload()
    
  }
 



  trimString(string:any, length:any) {
    return string?.length > length ?
      string.substring(0, length) + '...' :
      string;
  }



  crossBtnOtp(){
    this.router.navigate(["/carservice"])
    // location.reload();

}





}
