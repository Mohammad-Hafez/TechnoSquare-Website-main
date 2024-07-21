import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { TokenService } from '../../core/services/token.service';
import { AuthService } from '../../core/services/auth.service';
import { UserRoleService } from '../../core/services/user-role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css',
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule]
})
export class SidebarComponent implements OnInit {
  userRole: string = '';
  isAuthenticated;
  api: any;

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private userRoleService: UserRoleService,
    private router: Router
  ) {
    this.isAuthenticated = this.tokenService;
  }

  ngOnInit() {
    this.userRole = this.userRoleService.getUserRole();
  }

  onLogout() {
    if (this.userRole === 'instructor') {
      this.api = this.authService.onInstructorLogout()
    } else if (this.userRole === 'student') {
      this.api = this.authService.onStudentLogout()
    }
    this.api.subscribe({
      next: (value: any) => {
        this.router.navigate(['/home']);
      }
    })
  }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
