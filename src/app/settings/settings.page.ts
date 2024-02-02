import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../constants/urls';
import { HttpClient } from '@angular/common/http';
// import { AuthService } from './auth.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  ActiveUser: any;
  user: any;
  token:any
  language:any
  constructor(private http: HttpClient,private authService: AuthService,) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.token= this.user.id;
    this.http.get(`${Urls.ACCOUNT}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
    })

  }
  ionViewWillEnter() {
    this.language= localStorage.getItem("language");
    console.log(this.language)
  }

  LogOut() {
    this.authService.logout(this.token);
  }
}
