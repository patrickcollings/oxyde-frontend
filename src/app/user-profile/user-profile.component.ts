import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  show = '';

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    // Get latest user value
    this.authService.getCurrent().pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

}
