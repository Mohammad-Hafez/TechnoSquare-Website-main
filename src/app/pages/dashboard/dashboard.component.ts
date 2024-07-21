import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { StudentComponent } from './student/student.component';
import { TokenService } from '../../core/services/token.service';
import { AuthService } from '../../core/services/auth.service';
import { UserRoleService } from '../../core/services/user-role.service';
import { Router, RouterOutlet } from '@angular/router';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    SidebarComponent,
    StudentComponent,
    DashboardHeaderComponent,
    RouterOutlet,
  ],
})
export class DashboardComponent implements OnInit {
  userRole: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private userRoleService: UserRoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = this.userRoleService.getUserRole();
  }
}
