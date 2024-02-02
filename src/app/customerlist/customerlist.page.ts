import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Urls } from '../constants/urls';
import { ImagemodalPage } from '../imagemodal/imagemodal.page';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.page.html',
  styleUrls: ['./customerlist.page.scss'],
})
export class CustomerlistPage implements OnInit {
  images: any;
  urls = Urls;
  user: any;
  language:any
  constructor(
    public toastController: ToastController,
    private http: HttpClient, public modalController: ModalController,
  ) { }

  ngOnInit() {
    // this.http.get(`${Urls.FILES}/images/files`).subscribe(res => {
    //   console.log(res);
    //   this.images = res;
    // })
    this.ionViewWillEnter()
  }

  ionViewWillEnter() {
    this.language= localStorage.getItem("language");
    console.log(this.language)
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.http.get(`${Urls.FILES}/${this.user.userId}/files`).subscribe(res => {
      console.log(res);
      this.presentToast('Image loaded', 'primary', '200')
      this.images = res;
    })
    // this.http.get("http://localhost:3000/api/files/images/files").subscribe(res => {
    //   console.log(res)
    // })
  }


  onSelectImage(ev, i, im) {
    console.log(ev, i);
    this.presentModal(im, i)
  }
  async presentModal(w, i) {
    let v = {
      "name": w,
      "imageindex": i
    }
    console.log(w)
    const modal = await this.modalController.create({
      component: ImagemodalPage,
      componentProps: v
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned)
      // if (dataReturned !== null && dataReturned.data !== undefined) {
      //   this.dataReturned = dataReturned.data;
      //   console.log(this.valueOfWaste.length)
      //   if (this.valueOfWaste.length > 0) {
      //     let count = -1;
      //     for (var i = 0; i < this.valueOfWaste.length; i++) {
      //       if (this.valueOfWaste[i].name == dataReturned.data.name) {
      //         count = i;
      //       }
      //     }
      //     if (count >= 0) {
      //       this.valueOfWaste[count].value = dataReturned.data.value;
      //     } else {
      //       this.valueOfWaste.push(dataReturned.data)
      //     }
      //     console.log("New waste collection", this.valueOfWaste)

      //   } else {
      //     this.valueOfWaste.push(dataReturned.data)
      //     console.log("New waste collection", this.valueOfWaste)

      //   }
      //   w.value = dataReturned.data.value;
      // }
      this.ionViewWillEnter()
    });
    return await modal.present();
  }

  async presentToast(d, c, t) {
    const toast = await this.toastController.create({
      message: d,
      duration: t,
      position: 'top',
      cssClass: 'normalToast',
      color: c
    });
    toast.present();
  }
}
