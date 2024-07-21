import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { AuthService } from '../../core/services/auth.service';
import { UserRoleService } from '../../core/services/user-role.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgbDropdownModule,
    FontAwesomeModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  faBars = faBars;

  userRole: string = '';
  userName: string = '';
  userImage: string = '';
  isAuthenticated;
  api: any;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private userRoleService: UserRoleService,
    private userDataService: UserDataService,
    private router: Router
  ) {
    this.isAuthenticated = this.tokenService.isAuthentication;
  }

  ngOnInit() {
    this.userRole = this.userRoleService.getUserRole();
    this.userName = this.userDataService.getUserName();
    this.userImage = this.userDataService.getUserImage();
  }

  onLogout() {
    if (this.userRole === 'instructor') {
      this.api = this.authService.onInstructorLogout();
    } else if (this.userRole === 'student') {
      this.api = this.authService.onStudentLogout();
    }
    this.api.subscribe({
      next: (value: any) => {
        this.router.navigate(['/home']);
      },
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 50) {
      let element = document.getElementById('navbar');
      element!.classList.add('sticky-top', 'shadow-sm');
    } else {
      let element = document.getElementById('navbar');
      element!.classList.remove('sticky-top', 'shadow-sm');
    }
  }
}
