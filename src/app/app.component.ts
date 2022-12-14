import { Component, ChangeDetectorRef, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'Dealmoney-AutodealWeb';


  constructor(public  changeDetector: ChangeDetectorRef){}

  ngAfterContentChecked(): void {
    setTimeout(_ => this.changeDetector.detectChanges());
  }

  ngAfterViewInit() {
    setTimeout(_ => this.changeDetector.detectChanges());
  }
  
}
