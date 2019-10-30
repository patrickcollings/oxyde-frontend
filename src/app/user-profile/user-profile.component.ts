import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { take } from 'rxjs/operators';

enum Display {
  Details,
  Verify,
  Whitelist,
  Test
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  Display = Display;
  show: Display;

  constructor(
    private authService: AuthenticationService
  ) { 
    // Default to account detail panel
    this.show = Display.Details;
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    // Get latest user value
    this.authService.getCurrent().pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

}
