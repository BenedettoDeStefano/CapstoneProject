import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user-profile-tab',
  templateUrl: './user-profile-tab.component.html',
  styleUrls: ['./user-profile-tab.component.scss']
})
export class UserProfileTabComponent implements OnInit {

  currentUserInfo!: { username: string, email: string, profilePicture:string};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUserInfo = userInfo;
      console.log(this.currentUserInfo);
    });
  }

}
