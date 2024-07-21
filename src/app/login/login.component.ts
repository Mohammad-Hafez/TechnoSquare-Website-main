import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { UserRoleService } from '../core/services/user-role.service';
import { UserDataService } from '../core/services/user-data.service';
import { NavBarComponent } from '../layout/nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, NavBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  selectedRole: string = '';
  errorMessage: string = '';
  api: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userRoleService: UserRoleService,
    private userDataService: UserDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  setUserRole(role: string) {
    this.userRoleService.setUserRole(role);
  }

  setUserName(name: string) {
    this.userDataService.setUserName(name);
  }

  setUserImage(image: string) {
    this.userDataService.setUserImage(image);
  }

  onLogin(loginForm: FormGroup) {
    if (this.selectedRole === 'student') {
      this.api = this.authService.onStudentLogin(loginForm.value);
    } else if (this.selectedRole === 'instructor') {
      this.api = this.authService.onInstructorLogin(loginForm.value);
    }
    this.api.subscribe({
      next: (res: any) => {
        // alert(res.message);
        this.setUserRole(this.selectedRole);
        this.setUserName(res.student_name || res.instructor_name);
        this.setUserImage(res.student_img || res.instructor_img);
        this.router.navigateByUrl('/home');
      },
      error: (err: any) =>
        (this.errorMessage = err.error.message || 'Invalid Credentials.'),
    });
  }
}
