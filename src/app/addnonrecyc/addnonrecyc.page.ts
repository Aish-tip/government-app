import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { Urls } from "../constants/urls";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-addnonrecyc',
  templateUrl: './addnonrecyc.page.html',
  styleUrls: ['./addnonrecyc.page.scss'],
})
export class AddnonrecycPage implements OnInit {
  modalTitle: string;
  modelValue: number;
  modelRemark: string;
  dataValue: any;
  today = new Date();
  show: boolean;
  wList: any;
  language:any
  constructor(private modalController: ModalController,
    public navParams: NavParams, private datePipe: DatePipe,public alertController: AlertController,
    private http: HttpClient,) { }

  ngOnInit() {
    this.http.get(`${Urls.WLIST}?filter[where][type]=non-recyclable`).subscribe((res: any) => {
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
  todayDate:any
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
      element.newCenterId = this.navParams.data[0].id;
      // element.date = Date();
      element.date = this.datePipe.transform(this.today, 'YYYY-MM-dd')
      // element = element.name
      delete element['id'];
    });
    console.log(this.toaddArray)
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
            // this.router.navigate(['/tabs/tab1']);
            this.closeModal();
          }
      }],
    });
    await alert.present();

  }
  closeModal() {
    this.modalController.dismiss();
  }
}
