import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreatePopup } from '../create-popup/create-popup';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss']
})
export class NavBar implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);

  private routerSubscription: Subscription = new Subscription();
  isMobileMenuOpen: boolean = false;

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openCreatePopup() {
    const dialogRef = this.dialog.open(CreatePopup, {
      width: '500px',
      data: {}
    });
  }

  constructor(private router: Router) { }

}
