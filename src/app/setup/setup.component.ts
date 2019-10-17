import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication.service';
import { User } from '@app/_models';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  user: User;

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
