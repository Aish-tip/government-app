/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommondataService } from '../commondata.service';
import { Urls } from '../constants/urls';
import * as moment from 'moment';
import { IonAccordionGroup, ModalController, ToastController } from '@ionic/angular';
import { AddrecycPage } from '../addrecyc/addrecyc.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  chartOptions: any;
  chartOptionBar: any | undefined;
  chartOptionLine: any;
  chartOptionDough: any | undefined;
  tdtotal: number | undefined;
  firstDis: any;
  firstCen: any;
  todayTotal=0
  public folder: string;
  user;
  id: string;
  token: string;
  panchayatList: any[];
  Panchayat: any[];
  selectedValue: string;
  center: any;
  NewCenter:any;
  district:any
  districtList: any;
  ActiveUser: any;
  ex: string;
  totalCollection: any;
  waste: any;
  Tdate:any
  language:any
  typeOfWaste: { name: string; type: number; delete: string; value: number }[];
  constructor(private http: HttpClient, public modalController: ModalController, public datepipe :DatePipe,
    public toastController: ToastController, private commondata: CommondataService, private authService: AuthService) {
  } 

  async ngOnInit() {
    this.totalCollection = 0;
    this.user = await JSON.parse(localStorage.getItem('currentUser'));
   
    console.log(this.user);
    this.id = this.user.userId;
    this.token = this.user.id;
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.folder);
    // var x = this.commondata.getd(5);
    // console.log(x)
    this.http.get(`${Urls.DIS}`).subscribe((res: any) => {
      this.districtList = res;
      console.log(this.districtList);
      // this.firstDis = this.districtList[0];
      this.selectedValue = this.districtList[0].id;      
      // this.http.get(`${Urls.DIS}/${this.districtList[0].id}/newCenters`).subscribe((res: any) => {
      //   console.log(res);
      //   this.center = res;
      //   // this.centerId = this.center[0].id;
      //   this.firstCen = this.center[0];
      //   this.callcenter(this.center[0]);
      // });
    });
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe(res=>{
      this.ActiveUser = res;
      console.log(res);
      this.http.get(`${Urls.CEN}/${this.ActiveUser.centers[0]}?access_token=${this.user.id}`).subscribe(res=>{
        console.log("center",res)
        this.NewCenter= res;
        this.firstCen = this.NewCenter.centerName;
        this.Panchayat= this.NewCenter.panchayatList;
        this.http.get(`${Urls.DIS}/${this.NewCenter.districtId}?access_token=${this.user.id}`).subscribe(res=>{
          console.log("district",res);
          this.district=res;
          this.firstDis= this.district.name;
        })
      })
    })
    this.getUserCenters();
  }

  ionViewWillEnter() {
    this.language= localStorage.getItem("language");
    console.log(this.language)
  }

  getUserCenters() {
    this.http.get(`${Urls.WLIST}/?access_token=${this.user.id}`).subscribe((res: any) => {
      this.typeOfWaste = res;
      console.log(this.typeOfWaste);
      this.typeOfWaste.forEach(wastetype => {
        console.log(wastetype);
        wastetype.value = 0;
      });
    });
    // this.typeOfWaste= this.typeOfWaste.filter(res=> res.value != 0)
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res);
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
      this.ex = JSON.stringify(this.ActiveUser);
      this.http.get(`${Urls.CEN}/${this.ActiveUser.centers[0]}/newWasteCollecteds?filter[order]=date DESC&access_token=${this.user.id}`).subscribe((res => {
        console.log(res);
        this.waste = res;
        this.Tdate= this.datepipe.transform(this.waste[0].date, "dd/MM/YYYY") 
        this.waste.forEach(element => {
          // console.log(element)
          this.totalCollection = this.totalCollection + element.amount;
          if(element.date== this.waste[0].date){
            this.todayTotal= this.todayTotal + element.amount;
          }
        });
        console.log(this.totalCollection);
        if (this.totalCollection) {
          this.waste.forEach(item => {
            console.log(item);
            this.typeOfWaste.forEach(wastetype => {

              console.log(wastetype);
              if (wastetype.name === item.name) {
                console.log(item.amount);
                // console.log("Name " + wastetype.name + "=" + wastetype.value, element.value)
                wastetype.value = (wastetype.value) + parseFloat(item.amount);
                return false;
              }
            });
          });
          this.typeOfWaste= this.typeOfWaste.filter(res=> res.value != 0)
          console.log(this.typeOfWaste);
        }
      }));
    });
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 5);

  }

  logout() {
    this.authService.logout(this.token);
  }
  distfunct(e: any) {
    console.log(e);
    this.panchayatList = [];
    this.center = [];
    this.selectedValue = e.id;
    this.http.get(`${Urls.DIS}/${e.id}/newCenters`).subscribe((res: any) => {
      console.log(res);
      this.center = res;
      this.firstCen = this.center[0];
      // this.callcenter(this.center[0])
    });
  }
  modal(e, w) {
    // console.log(w)
    this.presentModal(e, w);
  }
  async presentModal(e, w) {
    console.log(e, w);
    const modal = await this.modalController.create({
      component: AddrecycPage,
      componentProps: [w]
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
      this.ngOnInit();
    });
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



  centerId: any;
  wList: any;
  total: number | undefined;
  seg: number | undefined;
  nonseg: number | undefined;
  callcenter(e: { id: any; panchayatList: any[] }) {
    console.log(e);
    this.centerId = e.id;
    this.panchayatList = e.panchayatList[0];
    this.http.get(`${Urls.CEN}/${e.id}/newWasteCollecteds`).subscribe((res: any) => {
      this.wList = res;
      console.log(this.wList);
      let total = 0;
      let seg = 0;
      let nonseg = 0;
      this.wList.forEach((element: { amount: number; seg: number; nonSeg: number }) => {
        // console.log(element, element.amount)
        total = total + element.amount;
        seg = seg + element.seg;
        nonseg = nonseg + element.nonSeg;
      });
      this.total = total;
      this.seg = seg;
      this.nonseg = nonseg;
    });
  }



  /* calling charts */
  callchart(from: any, _date: any, total: any, seg: any, nonseg: any) {
    console.log('chart called');
    this.chartOptions = {
      backgroundColor: 'transparent',
      title: {
        text: from + ' - ' + _date
      },
      data: [{
        type: 'funnel',
        indexLabel: '{label}: {y}',
        dataPoints: [
          { label: 'Total', y: total },
          { label: 'Non-segregated', y: nonseg },

          { label: 'Segregated', y: seg }

        ]
      }]

    };
    this.chartOptionLine = {
      backgroundColor: 'transparent',

      title: {
        text: from + ' - ' + _date
      },
      data: [{
        type: 'line',
        dataPoints: [
          { label: 'Total', y: total },
          { label: 'Non-segregated', y: nonseg },

          { label: 'Segregated', y: seg }
        ]
      }]

    };
    this.chartOptionBar = {
      backgroundColor: 'transparent',

      title: {
        text: from + ' - ' + _date
      },
      data: [{
        type: 'bar',
        dataPoints: [
          { label: 'Total', y: total },
          { label: 'Non-segregated', y: nonseg },

          { label: 'Segregated', y: seg }
        ]
      }]

    };
    this.chartOptionDough = {
      backgroundColor: 'transparent',

      title: {
        text: from + ' - ' + _date
      },
      data: [{
        type: 'doughnut',

        dataPoints: [
          { label: 'Total', y: total },
          { label: 'Non-segregated', y: nonseg },

          { label: 'Segregated', y: seg }
        ]
      }]

    };
  }

  sd: any; ed: any;
  onDates(e: any) {
    const dateTime1 = moment(e.detail.value).format('YYYY-MM-DD');
    console.log(e.detail.value);
    this.sd = dateTime1;
  }
  onDatee(e: any) {
    console.log(e.detail.value);
    const dateTime2 = moment(e.detail.value).format('YYYY-MM-DD');
    this.ed = dateTime2;
    // this.toggleAccordion();
    this.rdate(this.sd, this.ed);
  }
  rdate(s: any, e: any) {
    console.log(s, e);
    this.http.get(`${Urls.CEN}/${this.centerId}/newWasteCollecteds?filter[where][date][between][0]=${s}&filter[where][date][between][1]=${e}`).subscribe((res: any) => {
      console.log(res);
      this.wList = res;
      console.log(this.wList);
      let tdTotal = 0;
      let seg = 0;
      let nonseg = 0;
      this.wList.forEach((element: { amount: number; seg: number; nonSeg: number }) => {
        console.log(element, element.amount);
        tdTotal = tdTotal + element.amount;
        seg = seg + element.seg;
        nonseg = nonseg + element.nonSeg;
      });
      this.tdtotal = tdTotal;
      this.seg = seg;
      this.nonseg = nonseg;
      this.callchart(s, e, this.tdtotal, this.seg, this.nonseg);
    });
  }
  // toggleAccordion = () => {
  //   const nativeEl = this.accordionGroup;
  //   if (nativeEl.value === 'second') {
  //     nativeEl.value = undefined;
  //   } else {
  //     nativeEl.value = 'second';
  //   }
  // };
}
