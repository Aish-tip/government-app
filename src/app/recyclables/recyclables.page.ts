import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommondataService } from '../commondata.service';
import { Urls } from '../constants/urls';
import { DatePipe } from '@angular/common';
import { IonAccordionGroup, ModalController, ToastController } from '@ionic/angular';
import { AddrecycPageModule } from '../addrecyc/addrecyc.module';
import { AddrecycPage } from '../addrecyc/addrecyc.page';

@Component({
  selector: 'app-recyclables',
  templateUrl: './recyclables.page.html',
  styleUrls: ['./recyclables.page.scss'],
})
export class RecyclablesPage implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;

  uri: any;
  districtList: any;
  firstDis: any;
  selectedValue: any;
  center: any;
  firstCen: any;
  centerId: any;
  panchayatList: any;
  wList: any;
  ed: string;
  constructor(private http: HttpClient, public modalController: ModalController,
    public toastController: ToastController, private datePipe: DatePipe, private commondata: CommondataService, private authService: AuthService){}
  
  user:any
  ActiveUser:any
  id:any
  token:any
  NewCenter:any
  Panchayat:any
  district:any
  language:any
  ngOnInit() {
    // console.log( this.uri)
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.id = this.user.userId;
    this.token = this.user.id;
    this.http.get(`${Urls.DIS}`).subscribe((res: any) => {
      this.districtList = res;
      console.log(this.districtList)
      // this.firstDis = this.districtList[0]
      // this.distfunct(this.districtList[0]);
      this.selectedValue = this.districtList[0].id;
      this.http.get(`${Urls.DIS}/${this.districtList[0].id}/newCenters`).subscribe((res: any) => {
        console.log(res)
        this.center = res;
        // this.centerId = this.center[0].id;
        // this.firstCen = this.center[0];
        // this.callcenter(this.center[0])
      })
    })
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe(res=>{
      this.ActiveUser = res;
      console.log(res);
      this.http.get(`${Urls.CEN}/${this.ActiveUser.centers[0]}?access_token=${this.user.id}`).subscribe(res=>{
        console.log("center",res)
        this.NewCenter= res;
        this.firstCen = this.NewCenter.centerName;
        this.centerId= this.NewCenter.id;
        this.Panchayat= this.NewCenter.panchayatList;
        this.http.get(`${Urls.DIS}/${this.NewCenter.districtId}?access_token=${this.user.id}`).subscribe(res=>{
          console.log("district",res);
          this.district=res;
          this.firstDis= this.district.name;
          this.callcenter(this.centerId);
        })
      })
    })
  }

  ionViewWillEnter() {
    this.language= localStorage.getItem("language");
    console.log(this.language)
  }

  callcenter(e) {
    console.log(e)
    this.centerId = e;
    // this.panchayatList = e.panchayatList;
    // this.http.get(`${Urls.CEN}/${e.id}/newWasteCollecteds?filter[where][type]=recyclable&filter[limit]=20&filter[order]=date%20DESC`).subscribe((res: any) => {
      this.http.get(`${Urls.CEN}/${e}/newWasteCollecteds?filter[where][type]=recyclable&filter[limit]=20&filter[order]=date DESC`).subscribe((res: any) => {
      this.wList = res;
      console.log(this.wList)
      // var total = 0;
      // var seg = 0;
      // var nonseg = 0;
      // this.wList.forEach((element: { amount: number; seg: number; nonSeg: number; }) => {
      //   // console.log(element, element.amount)
      //   total = total + element.amount;
      //   seg = seg + element.seg;
      //   nonseg = nonseg + element.nonSeg;
      // });
      // this.total = total;
      // this.seg = seg;
      // this.nonseg = nonseg;
    })
  }
  onDatee(e: any) {
    console.log(e.detail.value)
    var dateTime2 = this.datePipe.transform(e.detail.value, 'YYYY-MM-dd');
    // .format("YYYY-MM-DD");
    // datePipe.transform(Date.now(),'yyyy-MM-dd')
    this.ed = dateTime2;
    console.log(this.ed)
    // this.toggleAccordion();
    this.rdate(this.ed);
  }
  rdate(e: any) {
    console.log(e)
    this.http.get(`${Urls.CEN}/${this.centerId}/newWasteCollecteds?filter[where][type]=recyclable&filter[order]=date DESC`).subscribe((res: any) => {
      console.log(res)
      this.wList = res;
      console.log(this.wList)
      var tdTotal = 0;
      var seg = 0;
      var nonseg = 0;
      this.wList.forEach((element: { amount: number; seg: number; nonSeg: number; }) => {
        console.log(element, element.amount)
        tdTotal = tdTotal + element.amount;
        seg = seg + element.seg;
        nonseg = nonseg + element.nonSeg;
      });
      // this.tdtotal = tdTotal;
      // this.seg = seg;
      // this.nonseg = nonseg;
      // this.callchart(s, e, this.tdtotal, this.seg, this.nonseg)
      const nativeEl = this.accordionGroup;
      if (nativeEl.value === 'second') {
        nativeEl.value = undefined;
      } else {
        nativeEl.value = 'second';
      }
    })
  }
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);

  }

  modal(e, w) {
    // console.log(w)
    this.presentModal(e, w)
  }
  async presentModal(e, w) {
    console.log(e, w)
    const modal = await this.modalController.create({
      component: AddrecycPage,
      componentProps: [this.centerId]
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned)
      this.ngOnInit()
    })
    // modal.onDidDismiss().then((dataReturned) => {
    //   if (dataReturned !== null && dataReturned.data !== undefined) {
    //     this.dataReturned = dataReturned.data;
    //     console.log(this.valueOfWaste.length)
    //     if (this.valueOfWaste.length > 0) {
    //       let count = -1;
    //       for (var i = 0; i < this.valueOfWaste.length; i++) {
    //         if (this.valueOfWaste[i].name == dataReturned.data.name) {
    //           count = i;
    //         }
    //       }
    //       if (count >= 0) {
    //         this.valueOfWaste[count].value = dataReturned.data.value;
    //       } else {
    //         this.valueOfWaste.push(dataReturned.data)
    //       }
    //       console.log("New waste collection", this.valueOfWaste)

    //     } else {
    //       this.valueOfWaste.push(dataReturned.data)
    //       console.log("New waste collection", this.valueOfWaste)

    //     }
    //     w.value = dataReturned.data.value;
    //   }
    // });
    return await modal.present();
  }
  opencomp(a, b) {
    console.log(a, b)
  }
}
