import { Component,  ViewChild } from '@angular/core';
import { Urls } from './constants/urls';
import { HttpClient } from "@angular/common/http";
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUserName: any;
  user:any;
  id: string;
  token: string;
  role: any;
  UserCenter: any;
  ActiveUser: any;
  ex: any;
  MyValue:any;
  language:any;
  English = "english";
  Kannada = "kannada";
  public appPages = [
    { title: 'Home', url: '/dashboard', icon: 'clipboard' },
    { title: 'Recyclables', url: '/recyclables', icon: 'repeat' },
    { title: 'Non Recyclables', url: '/nonrecyclables', icon: 'warning' },
    { title: 'Camera', url: '/availability/', icon: 'camera' },
    { title: 'Media', url: '/customerlist/', icon: 'images' },
    { title: 'Vehicle Tracking', url: '/vehicletracking/', icon: 'car' },
    { title: 'Settings', url: '/settings/', icon: 'car' }
  ];
  public KannadaAppPages = [
    { title: 'ಮುಖ್ಯ ಪುಟ', url: '/dashboard/', icon: 'clipboard' },
    { title: 'ಮರುಬಳಕೆ ಮಡಲಾಗುವುದು', url: '/recyclables/', icon: 'repeat' },
    { title: 'ಮರುಬಳಕೆ ಮಾಡಲಾಗದಿರುವುದು', url: '/nonrecyclables/', icon: 'warning' },
    { title: 'ಕ್ಯಾಮೆರಾ', url: '/availability/', icon: 'camera' },
    { title: 'ಮಾಧ್ಯಮ', url: '/customerlist/', icon: 'images' },
    { title: 'ವಾಹನ ಟ್ರ್ಯಾಕಿಂಗ್', url: '/vehicletracking/', icon: 'car' },
    { title: 'ಸಂಯೋಜನೆಗಳು', url: '/settings/', icon: 'settings' }
  ];
  public labels = [
    // { title: 'Vehicle Track', url: '/vehicletracking', icon: 'car' },
    { title: 'Accounts setting', url: '/setting', icon: 'settings' }];
  dark = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    public navCtrl:NavController
  ) { }
  async ngOnInit() {
    // localStorage.setItem("language",this.English);
    this.language=localStorage.getItem("language") 
    if(!this.language){
      console.log("language not set")
      localStorage.setItem("language","english");
    }
    else{
      if(this.language == "english"){
        this.MyValue = false;
      }
      else{
        this.MyValue = true;
      }
    }
    console.log(this.MyValue);
    this.user = await JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user)
    if (this.user != null) {
      this.id = this.user.userId;
      this.token = this.user.id;
      this.getUserCenters();
    }
  }

  getUserCenters() {
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
      this.ex = JSON.stringify(this.ActiveUser);
    })
  }

  logout() {
    this.authService.logout(this.token);
  }

  homel() {
    this.router.navigate(['/dashboard'])
  }
  recyc(){
    this.router.navigate(['/recyclables'])
  }
  nonrecyc(){
    this.router.navigate(['/nonrecyclables'])
  }
  camera(){
    this.router.navigate(['/availability'])
  }
  media(){
    this.router.navigate(['/customerlist'])
  }
 vehicleTrack(){
  this.router.navigate(['/vehicletracking'])
 }
 settings(){
  this.router.navigate(['/settings'])
 }
  myChange(e){    
    console.log(e);
    this.MyValue = !this.MyValue;
    console.log(this.MyValue)
    if(this.MyValue){
      localStorage.setItem("language",this.Kannada)
    }
    else{
      localStorage.setItem("language",this.English)
    }
    this.language = localStorage.getItem("language");
    console.log(this.language)
    location.reload(); 
    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.ngOnInit();
  }

}
