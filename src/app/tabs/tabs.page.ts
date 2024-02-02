import { Component, OnInit } from '@angular/core';
import { Urls } from '../constants/urls';
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  user: any;
  ActiveUser: any;
  ex: string;

  constructor(private authService: AuthService,
    private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user)
    // if (this.user != null) {
    //   this.id = this.user.userId;
    //   this.token = this.user.id;


    // }
  }

  async ngOnInit() {
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
      this.ex = JSON.stringify(this.ActiveUser);
      console.log(this.ex)
    })

  }
}
