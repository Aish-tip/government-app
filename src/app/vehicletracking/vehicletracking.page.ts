import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-vehicletracking',
  templateUrl: './vehicletracking.page.html',
  styleUrls: ['./vehicletracking.page.scss'],
})
export class VehicletrackingPage implements OnInit {

  constructor() { }
  language:any
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.language= localStorage.getItem("language");
    console.log(this.language)
  }


}
