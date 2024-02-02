import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Urls } from "../constants/urls";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-addrecyc',
  templateUrl: './addrecyc.page.html',
  styleUrls: ['./addrecyc.page.scss'],
})
export class AddrecycPage implements OnInit {
  modalTitle: string;
  modelValue: number;
  modelRemark: string;
  dataValue: any;
  today = new Date();
  todayDate:any
  show: boolean;
  wList: any;
  language:any
  constructor(private modalController: ModalController,
    public navParams: NavParams, private datePipe: DatePipe,public alertController: AlertController, public router: Router,
    private http: HttpClient,) { }

  ngOnInit() {
    this.http.get(`${Urls.WLIST}?filter[where][type]=recyclable`).subscribe((res: any) => {
      console.log(res)
      this.wList = res;
    })
    this.show = null;
    console.log(this.navParams.data[0])
    this.dataValue = {
      "name": this.navParams.data.gameName,
      "value": this.navParams.data
    }
    this.modelValue = null;
    console.log(this.dataValue)
  }

  ionViewWillEnter() {
    this.language= localStorage.getItem("language");
    console.log(this.language)
  }
  toaddArray: any = [];
  add(f: any) {
    f.form.value.name.amount = f.form.value.amount;
    this.todayDate = this.datePipe.transform(this.today, 'YYYY-MM-dd')
    f.form.value.name.date= this.todayDate;
    // this.toaddArray = this.toaddArray[f.form.value]
    console.log(f.form.value, this.toaddArray.length)
    if (this.toaddArray.length == 0) {
      this.toaddArray = [f.form.value.name];
    } else if (this.toaddArray.length > 0) {
      this.toaddArray.push(f.form.value.name)
    }
    console.log(this.toaddArray)

  }
  remove(a, i) {
    this.toaddArray.splice(i, 1)
    console.log(this.toaddArray)
  }
  async save() {
    this.toaddArray.forEach(element => {
      element.newCenterId = this.navParams.data[0];
      element.date = this.datePipe.transform(this.today, 'YYYY-MM-dd')
      // element.date.set
      // element = element.name
      delete element['id'];
    });
    console.log(this.toaddArray);
    // console.log(this.datePipe.transform(this.toaddArray.date, 'YYYY-MM-dd'))
    console.log(this.datePipe.transform(this.today, 'YYYY-MM-dd'))
    this.http.post(`${Urls.CEN}/${this.navParams.data[0]}/newWasteCollecteds`, this.toaddArray).subscribe((res: any) => {
      console.log(res)
      this.closeModal();
    }, err => {
      console.log(err)
    })

    const alert = await this.alertController.create({
      header: 'Hurray!!!',
      subHeader: 'Items added successfully!!',
      // message: `<img src="${this.ImageUrl}">`,
      buttons: [{
          text: 'Done',
          role: 'cancel',
          handler: data=>{
            
            this.closeModal();
            // this.router.navigate(['/recyclables']);
          }
      }],
    });
    await alert.present();
  }
  temp: any[] = [];
  updateqtynr(e, i) {
    console.log(e.detail.value, i)
    this.temp[i].weight = e.detail.value;
    // this.http.get(`${Urls.NRWASTE}/${id}`).subscribe(res => {
    //   this.Nonrecycle = res;
    //   this.qty = this.Nonrecycle.quantity;
    //   this.price = this.Nonrecycle.price;
    //   console.log(parseInt(this.Nonrecycle.quantity));
    //   this.temp[i].total = parseInt(this.temp[i].weight) * parseInt(this.price);
    //   this.temp[i].weight = parseInt(this.temp[i].weight) + parseInt(this.Nonrecycle.quantity);
    //   console.log(this.temp[i].weight)
    //   console.log(this.temp[i].total)
    // })
    console.log("t", this.temp);
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
