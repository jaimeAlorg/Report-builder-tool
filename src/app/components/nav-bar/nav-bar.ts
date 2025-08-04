import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.scss']
})
export class NavBar implements OnInit, OnDestroy {
  isMobileMenuOpen: boolean = false;
  private routerSubscription: Subscription = new Subscription();

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

  constructor(private router: Router) { }

}
