import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SlideInOutAnimation } from '@app/_helpers/animations';

@Component({
  selector: 'app-whitelist-wizard',
  templateUrl: './whitelist-wizard.component.html',
  styleUrls: ['./whitelist-wizard.component.scss'],
  animations: [SlideInOutAnimation]
})
export class WhitelistWizardComponent implements OnInit {

  formStates = [
    'in',
    'out',
    'out',
    'out',
    'out',
    'out',
    'out',
    'out',
    'out'
  ]

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goTo(pos: number, from: number) {
    // Hide old form
    this.formStates[from] = 'out';
    // Show new form
    this.formStates[pos] = 'in';
  }

  restart() {
    // Hide all states
    this.formStates.fill('out');
    // Show first state
    this.formStates[0] = 'in';
  }

  complete() {
    // Update whitelisting complete
    this.userService.whitelistingComplete(true).pipe(first()).subscribe(res => {
      this.router.navigate(['/user-profile']);
    });
  }
}
